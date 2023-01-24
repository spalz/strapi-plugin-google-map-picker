import pluginId from "../utils/plugin-id";

const getPluginConfig = (strapi: any) => {
    return strapi.plugin(pluginId).config;
};

export default getPluginConfig;
