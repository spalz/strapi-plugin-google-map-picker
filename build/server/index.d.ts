declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/strapi").Strapi;
    }) => void;
    config: {
        default: {
            apiKey: null;
            defaultCenter: null;
            favoritesPlaces: null;
        };
    };
    routes: {
        "admin-api": {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: string[];
                };
            }[];
        };
    };
    controllers: {
        "google-map-picker": {
            config(ctx: any): Promise<void>;
        };
    };
    services: {
        plugin: ({ strapi }: {
            strapi: import("@strapi/strapi").Strapi;
        }) => {
            getConfig(): Promise<any>;
        };
    };
};
export default _default;
