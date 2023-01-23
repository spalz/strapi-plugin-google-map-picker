const { pluginId } = require("../utils");

const getPluginConfig = (strapi) => {
  return strapi.plugin(pluginId).config;
};

module.exports = getPluginConfig;
