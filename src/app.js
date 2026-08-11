const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.routes');
const permissionRoutes = require('./routes/permissions.route');

const errorHandler = require('./middleware/error.middleware');

const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

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
