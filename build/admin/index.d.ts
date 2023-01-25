import { StrapiAdminInstance } from "strapi-typed";
import { TranslationKey } from "./translations";
declare const _default: {
    register(app: StrapiAdminInstance): void;
    registerTrads({ locales }: {
        locales: Array<TranslationKey>;
    }): Promise<({
        data: any;
        locale: string;
    } | {
        data: {};
        locale: string;
    })[]>;
};
export default _default;
