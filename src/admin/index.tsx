import { prefixPluginTranslations } from "@strapi/helper-plugin";
import MapPickerIcon from "./components/MapPicker/MapPickerIcon";
import { getTrad, pluginId } from "./utils";
import reducers from "./reducers";
import { StrapiAdminInstance } from "strapi-typed";

export default {
    register(app: StrapiAdminInstance) {
        app.customFields.register({
            name: "place",
            pluginId: pluginId,
            type: "string",
            icon: MapPickerIcon,
            intlLabel: {
                id: getTrad("google-map-picker.label"),
                defaultMessage: "Place",
            },
            intlDescription: {
                id: getTrad("google-map-picker.description"),
                defaultMessage: "Select place",
            },
            components: {
                Input: async () => import("./components/MapPicker/MapPickerComponent"),
            },
            options: {
                base: [],
                advanced: [
                    {
                        intlLabel: {
                            id: getTrad("google-map-picker.options.advanced.regex"),
                            defaultMessage: "RegExp pattern",
                        },
                        name: "regex",
                        type: "text",
                        description: {
                            id: getTrad("google-map-picker.options.advanced.regex.description"),
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
                                    id: getTrad("google-map-picker.options.advanced.requiredField"),
                                    defaultMessage: "Required field",
                                },
                                description: {
                                    id: getTrad("google-map-picker.options.advanced.requiredField.description"),
                                    defaultMessage: "You won't be able to create an entry if this field is empty",
                                },
                            },
                        ],
                    },
                ],
                validator: () => ({}),
            },
        });
        app.addReducers(reducers);
    },
    async registerTrads({ locales }: any) {
        const importedTrads = await Promise.all(
            locales.map((locale: any) => {
                return import(`./translations/${locale}.json`)
                    .then(({ default: data }) => {
                        return {
                            data: prefixPluginTranslations(data, pluginId),
                            locale,
                        };
                    })
                    .catch(() => {
                        return {
                            data: {},
                            locale,
                        };
                    });
            })
        );

        return Promise.resolve(importedTrads);
    },
};
