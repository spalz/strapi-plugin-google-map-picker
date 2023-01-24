import React from "react";

import MapPickerInput from "../MapPickerInput";
import usePluginConfig from "../../../hooks/use-plugin-config";

const MapPickerComponent = (props: any) => {
    const { config, isLoading } = usePluginConfig();
    console.log("config", config);
    return config && config.apiKey && config.default_center ? <MapPickerInput {...props} config={config} /> : null;
};

export default MapPickerComponent;
