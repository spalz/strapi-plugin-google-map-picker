"use strict";

import pluginId from "./plugin-id";

const getService = (name: any) => strapi.plugin(pluginId).service(name);

export default getService;
