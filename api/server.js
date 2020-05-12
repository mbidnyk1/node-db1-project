const express = require("express");

const db = require("../data/dbConfig.js");

const accountRouter = require('../accounts/account-router')
const morgan = require('morgan')
const helmet = require('helmet')
const server = express();

server.use(morgan('dev'),helmet(),express.json());

server.use('/api/accounts', accountRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up'})
});

module.exports = server;
