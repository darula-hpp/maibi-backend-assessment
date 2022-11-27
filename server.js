require('dotenv').config()
const express = require('express')
const Routes = require('./routes/routesList')
const bp = require('body-parser')
const mongoose = require('mongoose')
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
var cors = require('cors')

// create express app
const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors())
// middleware
app.use((req,res,next)=>{
   console.log(req.path,req.method);
   next()
})
// swagger code
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Maibi Backend-assessment Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple API application made with Express and documented with Swagger",
        contact: {
          name: "Thabo Maibi",
          url: "http://thabomaibi.ezyro.com/",
          email: "thabomaibi1999@gmail.com",
        },
      },
      servers: [
        {
          url:process.env.SERVER_URI,
        },
      ],
      components: {
          securitySchemes: {
              bearerAuth: {
                  type: 'http',
                  scheme: 'bearer',
                  bearerFormat: 'JWT',
              }
          }
      },
      security: [{
          bearerAuth: []
      }]
    },
    apis: ['./routes/*.js'],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs,{ explorer: true })
  );

// routes 
app.use('/',Routes)
// connect to database
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            // listen for requests
            app.listen(process.env.PORT,()=>{
                console.log('connected and listening on port',process.env.PORT)
            })
        })
        .catch((error)=>{
            console.log(error);
        })