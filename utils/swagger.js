const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API',
      version: '1.0.0',
      description: 'API documentation for your Express.js application',
    },
  },
  apis: ['./routes/api/*.js'], // Path to the API routes folder
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};