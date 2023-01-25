import { CustomFieldInputProps } from "strapi-typed";
export interface MapPickerInputProps extends CustomFieldInputProps {
    value: string | undefined;
    description?: any;
    config: {
        apiKey: string;
        defaultCenter: {
            lat: number;
            lng: number;
        };
        favoritesPlaces?: Array<{
            title: string;
            coordinates: {
                lat: number;
                lng: number;
            };
        }>;
    };
}
