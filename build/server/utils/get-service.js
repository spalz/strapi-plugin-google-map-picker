"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_id_1 = __importDefault(require("./plugin-id"));
const getService = (name) => strapi.plugin(plugin_id_1.default).service(name);
exports.default = getService;
//# sourceMappingURL=get-service.js.map