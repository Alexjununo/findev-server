const express = require('express');
const ip = require('ip');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const host = ip.address();
const port = 3333;

mongoose.connect(
  'mongodb+srv://alexjununo:alxjr2205@cluster0-c9v17.mongodb.net/findev?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, err =>
  !err ? console.log(host + ':' + port) : console.log(err)
);
