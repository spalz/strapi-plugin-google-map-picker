"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_id_1 = __importDefault(require("../utils/plugin-id"));
const getPluginConfig = (strapi) => {
    return strapi.plugin(plugin_id_1.default).config;
};
exports.default = getPluginConfig;
//# sourceMappingURL=pluginConfig.js.map