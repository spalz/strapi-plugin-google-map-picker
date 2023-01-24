"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MapPickerInput_1 = __importDefault(require("../MapPickerInput"));
const use_plugin_config_1 = __importDefault(require("../../../hooks/use-plugin-config"));
const MapPickerComponent = (props) => {
    const { config, isLoading } = (0, use_plugin_config_1.default)();
    console.log("config", config);
    return config && config.apiKey && config.default_center ? react_1.default.createElement(MapPickerInput_1.default, Object.assign({}, props, { config: config })) : null;
};
exports.default = MapPickerComponent;
