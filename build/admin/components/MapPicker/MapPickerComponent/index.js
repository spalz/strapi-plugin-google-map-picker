"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const design_system_1 = require("@strapi/design-system");
const MapPickerInput_1 = __importDefault(require("../MapPickerInput"));
const use_plugin_config_1 = __importDefault(require("../../../hooks/use-plugin-config"));
const MapPickerComponent = (props) => {
    const { config, isLoading } = (0, use_plugin_config_1.default)();
    return config && config.apiKey && config.default_center ? (react_1.default.createElement(MapPickerInput_1.default, { ...props, config: config })) : (!isLoading && !config.apiKey) || (!isLoading && !config.default_center) ? (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(design_system_1.FieldLabel, null, props.name),
        react_1.default.createElement(design_system_1.Box, { paddingTop: "1" },
            react_1.default.createElement(design_system_1.Status, { variant: "warning", size: "S", showBullet: false },
                react_1.default.createElement(design_system_1.Typography, null,
                    react_1.default.createElement(design_system_1.Typography, null,
                        "Missing: ",
                        !config.apiKey && react_1.default.createElement(design_system_1.Typography, { fontWeight: "bold" }, "apiKey"),
                        !config.apiKey && !config.default_center ? " and " : null,
                        !config.default_center && react_1.default.createElement(design_system_1.Typography, { fontWeight: "bold" }, "default_center"))),
                react_1.default.createElement("br", null),
                react_1.default.createElement(design_system_1.Link, { href: "https://github.com/spalz/strapi-plugin-google-map-picker", isExternal: true }, "Installation Instructions (GitHub)"))))) : null;
};
exports.default = MapPickerComponent;
//# sourceMappingURL=index.js.map