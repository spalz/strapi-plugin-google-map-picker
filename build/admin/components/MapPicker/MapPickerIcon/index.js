"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Icon_1 = require("@strapi/design-system/Icon");
const Flex_1 = require("@strapi/design-system/Flex");
const icons_1 = require("@strapi/icons");
const IconBox = (0, styled_components_1.default)(Flex_1.Flex) `
    background-color: #f0f0ff;
    border: 1px solid #d9d8ff;
    svg > path {
        fill: #4285f4;
    }
`;
const MapPickerIcon = () => {
    return (react_1.default.createElement(IconBox, { justifyContent: "center", alignItems: "center", width: 7, height: 6, hasRadius: true, "aria-hidden": true },
        react_1.default.createElement(Icon_1.Icon, { as: icons_1.PinMap })));
};
exports.default = MapPickerIcon;
//# sourceMappingURL=index.js.map