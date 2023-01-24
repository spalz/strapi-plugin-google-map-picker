"use strict";

import pluginId from "./utils/plugin-id";

export default ({ strapi }: any) => {
    strapi.customFields.register({
        name: "place",
        plugin: pluginId,
        type: "string",
        apiKey: strapi.plugin(pluginId).config("apiKey"),
        default_center: strapi.plugin(pluginId).config("default_center"),
        favorites_places: strapi.plugin(pluginId).config("favorites_places"),
    });
};
