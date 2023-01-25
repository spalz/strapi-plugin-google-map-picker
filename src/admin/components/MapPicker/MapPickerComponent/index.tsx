import React from "react";

import { Box, Link, Status, Typography, FieldLabel } from "@strapi/design-system";

import MapPickerInput from "../MapPickerInput";
import usePluginConfig from "../../../hooks/use-plugin-config";
import { MapPickerInputProps } from "../../../../types";

const MapPickerComponent = (props: MapPickerInputProps) => {
    const { config, isLoading } = usePluginConfig();

    return config && config.apiKey && config.default_center ? (
        <MapPickerInput {...props} config={config} />
    ) : (!isLoading && !config.apiKey) || (!isLoading && !config.default_center) ? (
        <>
            <FieldLabel>{props.name}</FieldLabel>
            <Box paddingTop="1">
                <Status variant="warning" size="S" showBullet={false}>
                    <Typography>
                        <Typography>
                            Missing: {!config.apiKey && <Typography fontWeight="bold">apiKey</Typography>}
                            {!config.apiKey && !config.default_center ? " and " : null}
                            {!config.default_center && <Typography fontWeight="bold">default_center</Typography>}
                        </Typography>
                    </Typography>
                    <br />
                    <Link href="https://github.com/spalz/strapi-plugin-google-map-picker" isExternal>
                        Installation Instructions (GitHub)
                    </Link>
                </Status>
            </Box>
        </>
    ) : null;
};

export default MapPickerComponent;
