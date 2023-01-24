export interface MapPickerInputProps {
    intlLabel: any;
    onChange: any;
    attribute: any;
    name: string;
    description?: any;
    error?: string;
    labelAction?: any;
    required?: boolean;
    value?: any;
    config: {
        apiKey: string;
        default_center: {
            lat: number;
            lng: number;
        };
        favorites_places: Array<{ title: string; coordinates: { lat: number; lng: number } }>;
    };
}
