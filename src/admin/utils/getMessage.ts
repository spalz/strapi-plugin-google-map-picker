import { useIntl } from "react-intl";
import { isString } from "lodash";

export type ToBeFixed = any;

import pluginId from "./plugin-id";

const getMessage = (input: ToBeFixed, defaultMessage = "", inPluginScope = true) => {
    const { formatMessage } = useIntl();
    let formattedId = "";
    if (isString(input)) {
        formattedId = input;
    } else {
        formattedId = input?.id;
    }

    return formatMessage(
        {
            id: `${inPluginScope ? pluginId : "app.components"}.${formattedId}`,
            defaultMessage,
        },
        input?.props
    );
};

export default getMessage;
