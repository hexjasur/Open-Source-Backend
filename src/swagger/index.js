const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.3',

    info: {
      title: 'Yolnoma API',
      version: '1.0.0',
      description: 'Yolnoma Backend API for Yolnoma Tauri integration',
    },

    servers: [
      {
        url: process.env.SWAGGER_SERVER_URL || 'http://localhost:7777',
        description: 'Development server',
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
