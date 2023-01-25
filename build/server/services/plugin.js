"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const plugin_id_1 = __importDefault(require("../utils/plugin-id"));
exports.default = ({ strapi }) => ({
    async getConfig() {
        const data = await strapi.config.get(`plugin.${plugin_id_1.default}`, config_1.default.default);
        return data;
    },
});
//# sourceMappingURL=plugin.js.map