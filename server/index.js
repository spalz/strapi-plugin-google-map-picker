"use strict";

const register = require("./register");
const config = require("./config");
const routes = require("./routes");
const controllers = require("./controllers");
const services = require("./services");

module.exports = {
  register,
  config,
  routes,
  controllers,
  services,
};
