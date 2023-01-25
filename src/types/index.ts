import { CustomFieldInputProps } from "strapi-typed";

export interface MapPickerInputProps extends CustomFieldInputProps {
    value: string | undefined;
    description?: any;
    config: {
        apiKey: string;
        default_center: {
            lat: number;
            lng: number;
        };
        favorites_places: Array<{ title: string; coordinates: { lat: number; lng: number } }>;
    };
}
