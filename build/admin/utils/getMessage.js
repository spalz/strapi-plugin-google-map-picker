"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_intl_1 = require("react-intl");
const lodash_1 = require("lodash");
const plugin_id_1 = __importDefault(require("./plugin-id"));
const getMessage = (input, defaultMessage = "", inPluginScope = true) => {
    const { formatMessage } = (0, react_intl_1.useIntl)();
    let formattedId = "";
    if ((0, lodash_1.isString)(input)) {
        formattedId = input;
    }
    else {
        formattedId = input?.id;
    }
    return formatMessage({
        id: `${inPluginScope ? plugin_id_1.default : "app.components"}.${formattedId}`,
        defaultMessage,
    }, input?.props);
};
exports.default = getMessage;
//# sourceMappingURL=getMessage.js.map