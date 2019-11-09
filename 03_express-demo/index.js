const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db')
const Joi = require('@hapi/joi');
const logger = require('./logger');
const authenticater = require('./authenticater');
const helmet = require('helmet');
// const morgan = requ  ire('morgan');
const config = require('config');
const courses = require('./courses');
const landing = require('./landing');

const express = require('express');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/', landing);
app.use('/api/courses', courses);

// console.log('Name: ' + config.get('name'));
// console.log('Mail hose: ' + config.get('mail.host'));
// console.log('Mail PW: ' + config.get('mail.password'));

if (app.get('env') === "development"){
    // app.use(morgan());
    startupDebugger('Morgan enabled...')
    app.use(logger);
}

// Do some db work
dbDebugger("Conected to the db!!!   ")

app.use(authenticater);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Now listening on port ${port}...`);
})  