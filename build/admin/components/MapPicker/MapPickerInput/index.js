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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const design_system_1 = require("@strapi/design-system");
const api_1 = require("@react-google-maps/api");
const react_intl_1 = require("react-intl");
const utils_1 = require("../../../utils");
const LIBRARIES = ["places", "geometry"];
const AUTOCOMPLETE_FIELDS = ["geometry"];
const mapContainerStyle = {
    height: "400px",
    width: "100%",
};
const MapPickerInput = ({ attribute, description, error = null, intlLabel, labelAction = null, name, onChange, required = false, value, config: { apiKey, default_center, favorites_places }, }) => {
    const { isLoaded, loadError } = (0, api_1.useLoadScript)({
        googleMapsApiKey: apiKey,
        libraries: LIBRARIES,
    });
    const [searchResult, setSearchResult] = (0, react_1.useState)();
    const [marker, setMarker] = (0, react_1.useState)(false);
    const [location, setLocation] = (0, react_1.useState)(default_center);
    const [center, setCenter] = (0, react_1.useState)(default_center);
    const [field, setField] = (0, react_1.useState)(false);
    const [fieldError, setFieldError] = (0, react_1.useState)(false);
    const { formatMessage } = (0, react_intl_1.useIntl)();
    const onLoadAutocomplete = (autocomplete) => {
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
    const onMarkerDraggable = (drag) => {
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
    const onChangeLocation = (coordinates) => {
        setCenter({
            lat: coordinates.lat,
            lng: coordinates.lng,
        });
    };
    const onChangeField = (value) => {
        if (!marker) {
            setMarker(true);
        }
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
        }
        else {
            setFieldError(true);
        }
    };
    const onLoad = react_1.default.useCallback(function onLoad() {
        if (value) {
            setMarker(true);
            setLocation(JSON.parse(value));
            setCenter(JSON.parse(value));
        }
    }, []);
    const val_display = (value) => {
        if (value) {
            const val = JSON.parse(value);
            return `${val.lat.toFixed(6)}, ${val.lng.toFixed(6)}`;
        }
        else {
            return formatMessage({
                id: (0, utils_1.getTrad)("google-map-picker.not-selected"),
                defaultMessage: "Not selected",
            });
        }
    };
    if (loadError?.target?.id === "script-loader") {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(design_system_1.FieldLabel, null, name),
            react_1.default.createElement(design_system_1.Box, { paddingTop: "1" },
                react_1.default.createElement(design_system_1.Status, { variant: "warning", size: "S", showBullet: false },
                    react_1.default.createElement(design_system_1.Typography, null,
                        react_1.default.createElement(design_system_1.Typography, null,
                            "Possibly missing: ",
                            react_1.default.createElement(design_system_1.Typography, { fontWeight: "bold" }, "middlewares"))),
                    react_1.default.createElement("br", null),
                    react_1.default.createElement(design_system_1.Link, { href: "https://github.com/spalz/strapi-plugin-google-map-picker", isExternal: true }, "Installation Instructions (GitHub)")))));
    }
    if (!isLoaded) {
        return react_1.default.createElement(SLoading, { style: mapContainerStyle }, "Loading...");
    }
    return (react_1.default.createElement(design_system_1.Field, { name: name, id: name, error: error, hint: description && formatMessage(description), required: required },
        react_1.default.createElement(design_system_1.Stack, { spacing: 1 },
            react_1.default.createElement(SFieldLabel, null,
                react_1.default.createElement(design_system_1.FieldLabel, { action: labelAction },
                    formatMessage(intlLabel),
                    react_1.default.createElement(SCoordinates, { onClick: () => setField(true), className: `${field ? "active" : ""}` }, val_display(value))),
                field && (react_1.default.createElement(SFieldInput, { type: "text", placeholder: "lat, lng", onChange: (val) => onChangeField(val), className: `${fieldError ? "error" : ""}` }))),
            isLoaded ? (react_1.default.createElement("div", null,
                favorites_places && (react_1.default.createElement(SFavoritesPlaces, null, favorites_places.map((item, idx) => {
                    return (react_1.default.createElement(SFavoritesPlacesItem, { key: idx, onClick: () => onChangeLocation(item.coordinates) },
                        react_1.default.createElement(design_system_1.Button, { size: "S", variant: "tertiary" }, item.title)));
                }))),
                react_1.default.createElement(SGoogleMap, null,
                    react_1.default.createElement(api_1.GoogleMap, { id: name, mapContainerStyle: mapContainerStyle, zoom: 10, center: center, onClick: (MapMouseEvent) => onMarkerDraggable(MapMouseEvent), onLoad: () => onLoad(), options: {
                            zoomControl: true,
                            maxZoom: 18,
                        } },
                        react_1.default.createElement(api_1.Autocomplete, { onLoad: (autocomplete) => onLoadAutocomplete(autocomplete), onPlaceChanged: () => onPlaceChanged(), fields: AUTOCOMPLETE_FIELDS },
                            react_1.default.createElement(SSearchField, { type: "text", placeholder: formatMessage({
                                    id: (0, utils_1.getTrad)("google-map-picker.search"),
                                    defaultMessage: "Search",
                                }) })),
                        marker ? (react_1.default.createElement(api_1.MarkerF, { position: location, draggable: true, onDragEnd: (onDragEnd) => onMarkerDraggable(onDragEnd) })) : null)))) : (react_1.default.createElement(SLoading, { style: mapContainerStyle }, "Loading...")),
            react_1.default.createElement(design_system_1.FieldHint, null),
            react_1.default.createElement(design_system_1.FieldError, null))));
};
const SLoading = styled_components_1.default.div `
    display: flex;
    background-color: ${({ theme }) => theme.colors.neutral300};
    align-items: center;
    justify-content: center;
`;
const SGoogleMap = styled_components_1.default.div `
    border-radius: ${({ theme }) => theme.borderRadius};
    overflow: hidden;
`;
const SFieldLabel = styled_components_1.default.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
`;
const SCoordinates = styled_components_1.default.span `
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
const SFieldInput = styled_components_1.default.input `
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
const SFavoritesPlaces = styled_components_1.default.div `
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
const SFavoritesPlacesItem = styled_components_1.default.div ``;
const SSearchField = styled_components_1.default.input `
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
exports.default = MapPickerInput;
//# sourceMappingURL=index.js.map