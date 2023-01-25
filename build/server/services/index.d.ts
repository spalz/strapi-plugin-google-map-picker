declare const _default: {
    plugin: ({ strapi }: {
        strapi: import("@strapi/strapi").Strapi;
    }) => {
        getConfig(): Promise<any>;
    };
};
export default _default;
