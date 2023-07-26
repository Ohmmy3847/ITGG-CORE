const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ITGG - CORE',
      version: '1.0.0',
      description: 'API DOCUMENT FOR ITGG WEBSITE',
    },
  },
  apis: ['./routes/api/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};