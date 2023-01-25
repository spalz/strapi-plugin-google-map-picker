"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const config_1 = __importDefault(require("./config"));
const reducers = {
    [`${utils_1.pluginId}_config`]: config_1.default,
};
exports.default = reducers;
//# sourceMappingURL=index.js.map