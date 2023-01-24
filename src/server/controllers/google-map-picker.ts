"use strict";

import getService from "../utils/get-service";

export default {
    async config(ctx: any) {
        const config = await getService("plugin").getConfig();

        ctx.send(config);
    },
};
