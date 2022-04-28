const express = require("express");
const controller = require('../controller/controller.js')

const route = express.Router();


//APIs

route.post('/report',controller.generateReport);
route.get('/report',controller.getReport);


module.exports = route;