import React from "react";

import { Box } from "@strapi/design-system/Box";
import { Link } from "@strapi/design-system/Link";
import { Status } from "@strapi/design-system";
import { Typography } from "@strapi/design-system/Typography";
import { FieldLabel } from "@strapi/design-system/Field";

import MapPickerInput from "../MapPickerInput";
import usePluginConfig from "../../../hooks/use-plugin-config";
import { MapPickerInputProps } from "../../../../types";

const MapPickerComponent = (props: MapPickerInputProps) => {
    const { config, isLoading } = usePluginConfig();

    return config && config.apiKey && config.defaultCenter ? (
        <MapPickerInput {...props} config={config} />
    ) : (!isLoading && !config.apiKey) || (!isLoading && !config.defaultCenter) ? (
        <>
            <FieldLabel>{props.name}</FieldLabel>
            <Box paddingTop="1">
                <Status variant="warning" size="S" showBullet={false}>
                    <Typography>
                        <Typography>
                            Missing: {!config.apiKey && <Typography fontWeight="bold">apiKey</Typography>}
                            {!config.apiKey && !config.defaultCenter ? " and " : null}
                            {!config.defaultCenter && <Typography fontWeight="bold">defaultCenter</Typography>}
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
