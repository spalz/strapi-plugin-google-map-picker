"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immer_1 = __importDefault(require("immer"));
const constants_1 = require("../constants");
const initialState = {
    isLoading: true,
    config: {
        apiKey: null,
        default_center: {},
        favorites_places: [],
    },
};
const configReducer = (0, immer_1.default)((state = initialState, action) => {
    switch (action.type) {
        case constants_1.RESOLVE_CONFIG: {
            state.isLoading = false;
            state.config = action.data;
            break;
        }
        default:
            return state;
    }
    return state;
});
exports.default = configReducer;
//# sourceMappingURL=config.js.map