const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../../package.json');

const PORT = process.env.PORT || 7777;
const isDevelopmentMode = process.env.NODE_ENV === 'development';
const contactUrl = isDevelopmentMode
  ? `http://localhost:${PORT}/support`
  : 'https://backend.yolnoma.uz/support';

const swaggerServerUrl =
  process.env.SWAGGER_SERVER_URL ||
  (isDevelopmentMode
    ? `http://localhost:${PORT}`
    : 'https://backend.yolnoma.uz/docs/');

const options = {
  definition: {
    openapi: '3.0.3',

    info: {
      title: 'Yolnoma API',
      version,
      description: 'Yolnoma Backend API for Yolnoma Tauri integration',
      contact: {
        name: 'Support Team',
        url: contactUrl,
        email: 'hexjasur@gmail.com',
      },
    },

    servers: [
      {
        url: swaggerServerUrl,
        description: isDevelopmentMode
          ? 'Development server'
          : 'Production server',
      },
      {
        url: 'https://backend.yolnoma.uz/docs',
        description: 'Render production server',
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  apis: [
    path.join(__dirname, 'auth.swagger.js'),
    path.join(__dirname, 'model.swagger.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
