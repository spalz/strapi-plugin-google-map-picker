"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_plugin_1 = require("@strapi/helper-plugin");
const MapPickerIcon_1 = __importDefault(require("./components/MapPicker/MapPickerIcon"));
const utils_1 = require("./utils");
const reducers_1 = __importDefault(require("./reducers"));
exports.default = {
    register(app) {
        app.addReducers(reducers_1.default);
        app.customFields.register({
            name: "place",
            pluginId: utils_1.pluginId,
            type: "string",
            icon: MapPickerIcon_1.default,
            intlLabel: {
                id: (0, utils_1.getTrad)("google-map-picker.label"),
                defaultMessage: "Place",
            },
            intlDescription: {
                id: (0, utils_1.getTrad)("google-map-picker.description"),
                defaultMessage: "Select place",
            },
            components: {
                Input: () => __awaiter(this, void 0, void 0, function* () { return Promise.resolve().then(() => __importStar(require("./components/MapPicker/MapPickerComponent"))); }),
            },
            options: {
                advanced: [
                    {
                        intlLabel: {
                            id: (0, utils_1.getTrad)("google-map-picker.options.advanced.regex"),
                            defaultMessage: "RegExp pattern",
                        },
                        name: "regex",
                        type: "text",
                        description: {
                            id: (0, utils_1.getTrad)("google-map-picker.options.advanced.regex.description"),
                            defaultMessage: "The text of the regular expression",
                        },
                    },
                    {
                        sectionTitle: {
                            id: "global.settings",
                            defaultMessage: "Settings",
                        },
                        items: [
                            {
                                name: "required",
                                type: "checkbox",
                                intlLabel: {
                                    id: (0, utils_1.getTrad)("google-map-picker.options.advanced.requiredField"),
                                    defaultMessage: "Required field",
                                },
                                description: {
                                    id: (0, utils_1.getTrad)("google-map-picker.options.advanced.requiredField.description"),
                                    defaultMessage: "You won't be able to create an entry if this field is empty",
                                },
                            },
                        ],
                    },
                ],
            },
        });
    },
    registerTrads({ locales }) {
        return __awaiter(this, void 0, void 0, function* () {
            const importedTrads = yield Promise.all(locales.map((locale) => {
                var _a;
                return (_a = `./translations/${locale}.json`, Promise.resolve().then(() => __importStar(require(_a)))).then(({ default: data }) => {
                    return {
                        data: (0, helper_plugin_1.prefixPluginTranslations)(data, utils_1.pluginId),
                        locale,
                    };
                })
                    .catch(() => {
                    return {
                        data: {},
                        locale,
                    };
                });
            }));
            return Promise.resolve(importedTrads);
        });
    },
};
