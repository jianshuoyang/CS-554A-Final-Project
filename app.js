const express = require('express');
const app = express();
const configRoutes = require('./routes');
let bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let requestCount = 0;

app.use(async (req, res, next) => {

  requestCount++;

  console.log(`Total number of requests: ${requestCount}`);
  next();
})

const pathsAccessed = {};

app.use(async (req, res, next) => {

  let requestMethod = req.method;

  let requestBody = req.body;

  if (!pathsAccessed[req.path]) pathsAccessed[req.path] = 0;

  pathsAccessed[req.path]++;

  console.log(`The request body is ${JSON.stringify(requestBody)},
  and there have now been ${pathsAccessed[req.path]} requests made to ${req.path},
   the request method is ${requestMethod}`);
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});