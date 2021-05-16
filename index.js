'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const eventRoutes = require('./routes/eventRoutes');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { required } = require('@hapi/joi');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true},
    () => console.log('connected to db')
);


app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use('/api', eventRoutes.routes);




const sql = require('mssql');
app.listen(3001, () => console.log('is on http://localhost:' + config.port));