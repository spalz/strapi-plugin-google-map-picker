"use strict";

import { Strapi } from "@strapi/strapi";

import pluginId from "./utils/plugin-id";

export default ({ strapi }: { strapi: Strapi }) => {
    strapi.customFields.register({
        name: "place",
        plugin: pluginId,
        type: "string",
        // apiKey: strapi.plugin(pluginId).config("apiKey"),
        // defaultCenter: strapi.plugin(pluginId).config("defaultCenter"),
        // favoritesPlaces: strapi.plugin(pluginId).config("favoritesPlaces"),
    });
};
