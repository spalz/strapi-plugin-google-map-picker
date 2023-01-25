"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const helper_plugin_1 = require("@strapi/helper-plugin");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const usePluginConfig = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const toggleNotification = (0, helper_plugin_1.useNotification)();
    const { config, isLoading } = (0, react_redux_1.useSelector)((state) => state[`${utils_1.pluginId}_config`]);
    (0, react_1.useEffect)(() => {
        if (!isLoading && !!config) {
            return;
        }
        const abortController = new AbortController();
        const fetchData = async () => {
            try {
                const endpoint = `/${utils_1.pluginId}/config`;
                const data = await (0, helper_plugin_1.request)(endpoint, {
                    method: "GET",
                    signal: abortController.signal,
                });
                return data ?? {};
            }
            catch (err) {
                if (!abortController.signal.aborted) {
                    toggleNotification({
                        type: "warning",
                        message: { id: "notification.error" },
                    });
                    return err;
                }
            }
        };
        fetchData().then((data) => dispatch({ type: constants_1.RESOLVE_CONFIG, data }));
        return () => abortController.abort();
    }, [dispatch, toggleNotification]);
    return { config, isLoading };
};
exports.default = usePluginConfig;
//# sourceMappingURL=use-plugin-config.js.map