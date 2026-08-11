const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('./user.service');

const createAccessToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      type: 'access',
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    },
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      type: 'refresh',
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '7d',
    },
  );
};

const hashToken = async (token) => {
  return bcrypt.hash(token, 10);
};

const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    throw new Error('Invalid email or password');
  }

  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  user.refresh_token_hash = await hashToken(refreshToken);
  await user.save();

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    user: userService.sanitizeUser(user),
  };
};

const refreshTokens = async (refreshToken) => {
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    if (payload.type !== 'refresh') {
      throw new Error('Invalid refresh token');
    }

    const user = await userService.getUserById(payload.sub, {
      includeRefreshTokenHash: true,
    });

    if (!user || !user.refresh_token_hash) {
      throw new Error('Invalid refresh token');
    }

    const validRefresh = await bcrypt.compare(
      refreshToken,
      user.refresh_token_hash,
    );

    if (!validRefresh) {
      throw new Error('Invalid refresh token');
    }

    const accessToken = createAccessToken(user);
    const newRefreshToken = createRefreshToken(user);
    user.refresh_token_hash = await hashToken(newRefreshToken);
    await user.save();

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
      user: userService.sanitizeUser(user),
    };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Refresh token expired');
    }

    throw new Error('Invalid refresh token');
  }
};

module.exports = {
  login,
  refreshTokens,
};
