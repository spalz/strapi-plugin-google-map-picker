"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_service_1 = __importDefault(require("./get-service"));
const plugin_id_1 = __importDefault(require("./plugin-id"));
exports.default = {
    getService: get_service_1.default,
    pluginId: plugin_id_1.default,
};
//# sourceMappingURL=index.js.map