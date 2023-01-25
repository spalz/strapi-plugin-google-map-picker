"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginName = exports.pluginId = exports.getTrad = void 0;
var get_trad_1 = require("./get-trad");
Object.defineProperty(exports, "getTrad", { enumerable: true, get: function () { return __importDefault(get_trad_1).default; } });
var plugin_id_1 = require("./plugin-id");
Object.defineProperty(exports, "pluginId", { enumerable: true, get: function () { return __importDefault(plugin_id_1).default; } });
var plugin_name_1 = require("./plugin-name");
Object.defineProperty(exports, "pluginName", { enumerable: true, get: function () { return __importDefault(plugin_name_1).default; } });
//# sourceMappingURL=index.js.map