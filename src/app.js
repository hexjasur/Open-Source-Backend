const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.routes');
const permissionRoutes = require('./routes/permissions.route');

const errorHandler = require('./middleware/error.middleware');

const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
    : true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// Optional debug middleware to log CORS-related request/response headers.
// Enable by setting DEBUG_CORS=true in the environment (do NOT enable in public prod long-term).
if (process.env.DEBUG_CORS === 'true') {
  app.use((req, res, next) => {
    const origin = req.headers.origin || '<no-origin>';
    console.log(
      '[DEBUG_CORS] incoming:',
      req.method,
      req.originalUrl,
      'Origin:',
      origin,
    );

    // after response sent log the Access-Control-Allow-Origin header and status
    res.on('finish', () => {
      console.log(
        `[DEBUG_CORS] response: ${req.method} ${req.originalUrl} -> ${res.statusCode} Access-Control-Allow-Origin: ${res.get('Access-Control-Allow-Origin')}`,
      );
    });

    next();
  });
}

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Yolnoma API is running',
  });
});

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/permissions', permissionRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

module.exports = app;
