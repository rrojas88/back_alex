const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const routesV1 = require('./routesV1/routes');
const log = require('../utils/general');

dotenv.config();

const app = express();

console.log("\nMONGO ===>", process.env.MONGO);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


routesV1(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  log.info(`Running in port ${PORT}`);
});
