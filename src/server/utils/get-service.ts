"use strict";

import pluginId from "./plugin-id";

const getService = (name: string) => strapi.plugin(pluginId).service(name);

export default getService;
