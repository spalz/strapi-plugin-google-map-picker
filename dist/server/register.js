"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_id_1 = __importDefault(require("./utils/plugin-id"));
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: "place",
        plugin: plugin_id_1.default,
        type: "string",
        apiKey: strapi.plugin(plugin_id_1.default).config("apiKey"),
        default_center: strapi.plugin(plugin_id_1.default).config("default_center"),
        favorites_places: strapi.plugin(plugin_id_1.default).config("favorites_places"),
    });
};
