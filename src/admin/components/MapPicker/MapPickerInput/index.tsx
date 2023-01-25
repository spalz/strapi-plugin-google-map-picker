import React, { useState } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { Stack } from "@strapi/design-system/Stack";
import { Button } from "@strapi/design-system/Button";
import { Box } from "@strapi/design-system/Box";
import { Status } from "@strapi/design-system/Status";
import { Link } from "@strapi/design-system/Link";
import { Typography } from "@strapi/design-system/Typography";
import { Field, FieldError, FieldHint, FieldLabel } from "@strapi/design-system/Field";
import { GoogleMap, Autocomplete, MarkerF, useLoadScript } from "@react-google-maps/api";

import { getTrad } from "../../../utils";
import { MapPickerInputProps } from "../../../../types";

const LIBRARIES: Array<"places" | "geometry"> = ["places", "geometry"];
const AUTOCOMPLETE_FIELDS = ["geometry"];

const mapContainerStyle = {
    height: "400px",
    width: "100%",
};

const MapPickerInput: React.FC<MapPickerInputProps> = ({
    attribute,
    description,
    error = null,
    intlLabel,
    labelAction = null,
    name,
    onChange,
    required = false,
    value,
    config: { apiKey, defaultCenter, favoritesPlaces },
}) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: LIBRARIES,
    });

    const { formatMessage } = useIntl();

    const [searchResult, setSearchResult] = useState<google.maps.places.Autocomplete>();
    const [marker, setMarker] = useState(false);
    const [location, setLocation] = useState(defaultCenter);
    const [center, setCenter] = useState<{ lat: number; lng: number }>(defaultCenter);
    const [field, setField] = useState(false);
    const [fieldError, setFieldError] = useState(false);

    const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
        setSearchResult(autocomplete);
    };

    const onPlaceChanged = () => {
        if (searchResult != null) {
            setMarker(true);
            const place = searchResult.getPlace();
            const geometry = place?.geometry?.location;
            if (geometry) {
                setCenter({
                    lat: geometry.lat(),
                    lng: geometry.lng(),
                });
            }
        }
    };

    const onMarkerDraggable = (drag: google.maps.MapMouseEvent) => {
        setMarker(true);
        if (drag && drag.latLng) {
            setLocation({
                lat: drag.latLng.lat(),
                lng: drag.latLng.lng(),
            });
            onChange?.({
                target: {
                    name,
                    value: JSON.stringify({
                        lat: drag.latLng.lat(),
                        lng: drag.latLng.lng(),
                    }),
                    type: attribute.type,
                },
            });
        }
    };

    const onChangeLocation = (coordinates: { lat: number; lng: number }) => {
        setCenter({
            lat: coordinates.lat,
            lng: coordinates.lng,
        });
    };

    const onChangeField = (value: { target: { value: string } }) => {
        if (!marker) {
            setMarker(true);
        }
        // eslint-disable-next-line no-useless-escape
        const regexCoordinates = /^((\-?|\+?)?\d+(\.\d+)?),\s((\-?|\+?)?\d+(\.\d+)?)$/gi;
        const val = value.target.value;
        const checkVal = regexCoordinates.test(val);

        if (checkVal) {
            setFieldError(false);
            const [lat, lng] = val.split(",");
            setLocation({ lat: Number(lat), lng: Number(lng) });
            setCenter({ lat: Number(lat), lng: Number(lng) });
            onChange?.({
                target: {
                    name,
                    value: JSON.stringify({ lat: Number(lat), lng: Number(lng) }),
                    type: attribute.type,
                },
            });
        } else {
            setFieldError(true);
        }
    };

    const onLoad = React.useCallback(function onLoad() {
        if (value) {
            setMarker(true);
            setLocation(JSON.parse(value));
            setCenter(JSON.parse(value));
        }
    }, []);

    const valDisplay = (value?: string | null) => {
        if (value) {
            const val = JSON.parse(value);
            return `${val.lat.toFixed(6)}, ${val.lng.toFixed(6)}`;
        } else {
            return formatMessage({
                id: getTrad("google-map-picker.not-selected"),
                defaultMessage: "Not selected",
            });
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (loadError?.target?.id === "script-loader") {
        return (
            <>
                <FieldLabel>{name}</FieldLabel>
                <Box paddingTop="1">
                    <Status variant="warning" size="S" showBullet={false}>
                        <Typography>
                            <Typography>
                                Possibly missing: <Typography fontWeight="bold">middlewares</Typography>
                            </Typography>
                        </Typography>
                        <br />
                        <Link href="https://github.com/spalz/strapi-plugin-google-map-picker" isExternal>
                            Installation Instructions (GitHub)
                        </Link>
                    </Status>
                </Box>
            </>
        );
    }

    if (!isLoaded) {
        return <SLoading style={mapContainerStyle}>Loading...</SLoading>;
    }

    return (
        <Field name={name} id={name} error={error} hint={description && formatMessage(description)} required={required}>
            <Stack spacing={1}>
                <SFieldLabel>
                    <FieldLabel action={labelAction}>
                        {formatMessage(intlLabel)}
                        <SCoordinates onClick={() => setField(true)} className={`${field ? "active" : ""}`}>
                            {valDisplay(value)}
                        </SCoordinates>
                    </FieldLabel>
                    {field && (
                        <SFieldInput
                            type="text"
                            placeholder="lat, lng"
                            onChange={(val) => onChangeField(val)}
                            className={`${fieldError ? "error" : ""}`}
                        />
                    )}
                </SFieldLabel>

                {isLoaded ? (
                    <div>
                        {favoritesPlaces && (
                            <SFavoritesPlaces>
                                {favoritesPlaces.map((item, idx) => {
                                    return (
                                        <SFavoritesPlacesItem
                                            key={idx}
                                            onClick={() => onChangeLocation(item.coordinates)}
                                        >
                                            <Button size="S" variant="tertiary">
                                                {item.title}
                                            </Button>
                                        </SFavoritesPlacesItem>
                                    );
                                })}
                            </SFavoritesPlaces>
                        )}

                        <SGoogleMap>
                            <GoogleMap
                                id={name}
                                mapContainerStyle={mapContainerStyle}
                                zoom={10}
                                center={center}
                                onClick={(MapMouseEvent) => onMarkerDraggable(MapMouseEvent)}
                                onLoad={() => onLoad()}
                                options={{
                                    zoomControl: true,
                                    maxZoom: 18,
                                }}
                            >
                                <Autocomplete
                                    onLoad={(autocomplete: google.maps.places.Autocomplete) =>
                                        onLoadAutocomplete(autocomplete)
                                    }
                                    onPlaceChanged={() => onPlaceChanged()}
                                    fields={AUTOCOMPLETE_FIELDS}
                                >
                                    <SSearchField
                                        type="text"
                                        placeholder={formatMessage({
                                            id: getTrad("google-map-picker.search"),
                                            defaultMessage: "Search",
                                        })}
                                    />
                                </Autocomplete>
                                {marker ? (
                                    <MarkerF
                                        position={location}
                                        draggable={true}
                                        onDragEnd={(onDragEnd) => onMarkerDraggable(onDragEnd)}
                                    />
                                ) : null}
                            </GoogleMap>
                        </SGoogleMap>
                    </div>
                ) : (
                    <SLoading style={mapContainerStyle}>Loading...</SLoading>
                )}

                <FieldHint />
                <FieldError />
            </Stack>
        </Field>
    );
};

const SLoading = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.colors.neutral300};
    align-items: center;
    justify-content: center;
`;

const SGoogleMap = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius};
    overflow: hidden;
`;

const SFieldLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;

const SCoordinates = styled.span`
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    font-size: 0.75rem;
    margin-left: 0.2em;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.neutral800};
    height: 26px;
    &.active {
        cursor: default;
    }
`;

const SFieldInput = styled.input`
    border: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme }) => theme.colors.neutral0};

    padding: 0.2em 0.4em 0.3em;
    color: ${({ theme }) => theme.colors.neutral800};
    font-weight: 400;
    flex: 1;
    font-size: ${12 / 14}rem;
    display: block;
    width: 100%;
    ::placeholder {
        color: ${({ theme }) => theme.colors.neutral500};
        opacity: 1;
    }
    &:focus {
        outline: none;
        box-shadow: none;
    }
    &.error {
        border-color: ${({ theme }) => theme.colors.danger600};
    }
`;

const SFavoritesPlaces = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.primary600};
    &:hover {
        color: ${({ theme }) => theme.colors.primary500};
    }
    &.active {
        color: ${({ theme }) => theme.colors.primary700};
    }
`;

const SFavoritesPlacesItem = styled.div``;

const SSearchField = styled.input`
    box-sizing: border-box;
    border: 1px solid transparent;
    width: 240px;
    height: 40px;
    padding: 0 12px;
    border-radius: 3px;
    box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
    font-size: 14px;
    outline: none;
    text-overflow: ellipses;
    position: absolute;
    left: 200px;
    margin-top: 10px;
`;

export default MapPickerInput;
