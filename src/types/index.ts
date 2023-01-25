export interface MapPickerInputProps {
    attribute: {
        pluginOptions: {
            i18n: {
                localized: boolean;
            };
        };
        type: string;
        customField: string;
        required: boolean;
    };
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
    labelAction?: {
        key: any | null;
        ref: any | null;
        props: {
            title: {
                id: string;
                defaultMessage: string;
            };
            icon: {
                key: any | null;
                ref: any | null;
                props: {
                    "aria-hidden": boolean;
                };
                _owner: any | null;
            };
        };
        _owner: any | null;
    };

    onChange: any;
    name: string;
    description?: any;
    error?: null | string;
    required?: boolean;
    value: string | undefined;
    config: {
        apiKey: string;
        default_center: {
            lat: number;
            lng: number;
        };
        favorites_places: Array<{ title: string; coordinates: { lat: number; lng: number } }>;
    };
}
