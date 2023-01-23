import { prefixPluginTranslations } from "@strapi/helper-plugin";
import MapPickerIcon from "./components/MapPicker/MapPickerIcon";
import { getTrad, pluginId, pluginName } from "./utils";
import reducers from "./reducers";
// import Initializer from "./components/Initializer";

export default {
  register(app) {
    app.addReducers(reducers);
    app.customFields.register({
      // id: pluginId,
      name: "place",
      // initializer: Initializer,
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
        advanced: [
          {
            intlLabel: {
              id: getTrad("google-map-picker.options.advanced.regex"),
              defaultMessage: "RegExp pattern",
            },
            name: "regex",
            type: "text",
            description: {
              id: getTrad(
                "google-map-picker.options.advanced.regex.description"
              ),
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
                  id: getTrad(
                    "google-map-picker.options.advanced.requiredField"
                  ),
                  defaultMessage: "Required field",
                },
                description: {
                  id: getTrad(
                    "google-map-picker.options.advanced.requiredField.description"
                  ),
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
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
