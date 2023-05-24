require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const app = express();
const port = process.env.PORT || 3300;

const router = require('./App/routers');
const swaggerDocument = require("./helpers/swagger.json");

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(bodyParser.json());

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


// Middlewares setup
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);


app.listen(port, () => {
    console.log(`Server ready: http://localhost:${port}`);
}); 