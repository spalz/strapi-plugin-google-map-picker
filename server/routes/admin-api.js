"use strict";

module.exports = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/config",
      handler: "google-map-picker.config",
      config: {
        policies: ["admin::isAuthenticatedAdmin"],
      },
    },
  ],
};
