const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const sanitizeUser = (user) => {
  const data = user.toObject ? user.toObject() : { ...user };

  delete data.password_hash;
  delete data.refresh_token_hash;

  return data;
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const getUsers = async () => {
  const users = await User.find()
    .select('-password_hash')
    .sort({ created_at: -1 });

  return users;
};

const getUserById = async (id, options = {}) => {
  let query = User.findById(id);

  if (options.includeRefreshTokenHash) {
    query = query.select('-password_hash +refresh_token_hash');
  } else {
    query = query.select('-password_hash');
  }

  const user = await query;

  return user;
};

const getUserByEmail = async (email) => {
  return User.findOne({
    email: email.toLowerCase(),
  });
};

const createUser = async (data) => {
  if (!data.password) {
    throw new Error('Password is required');
  }

  const userData = {
    ...data,
    email: data.email ? data.email.toLowerCase() : undefined,
    password_hash: await hashPassword(data.password),
  };

  delete userData.password;

  const user = await User.create(userData);

  return sanitizeUser(user);
};

const updateUser = async (id, data) => {
  const updateData = { ...data };

  delete updateData.password_hash;

  if (updateData.password) {
    updateData.password_hash = await hashPassword(updateData.password);
    delete updateData.password;
  }

  if (updateData.email) {
    updateData.email = updateData.email.toLowerCase();
  }

  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select('-password_hash');

  return user;
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  sanitizeUser,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
