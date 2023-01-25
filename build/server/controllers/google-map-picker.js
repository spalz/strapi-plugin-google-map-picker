"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_service_1 = __importDefault(require("../utils/get-service"));
exports.default = {
    async config(ctx) {
        const config = await (0, get_service_1.default)("plugin").getConfig();
        ctx.send(config);
    },
};
//# sourceMappingURL=google-map-picker.js.map