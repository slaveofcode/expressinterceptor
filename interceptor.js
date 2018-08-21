"use strict";

const got = require("got");

const makeInterceptor = (serverUrl, appName) => {
  const reqHTTP = got.extend({
    baseUrl: serverUrl || "http://localhost:1831",
    json: true
  });

  const makeInterceptInput = (hostName) => {
    return async (req, key) => {
      const { params, body, headers, query } = req;
      const httpInfo = {
        protocol: req.protocol,
        hostName: req.get("host"),
        method: req.method.toUpperCase(),
        path: req.originalUrl
      };
      const baseParams = {
        hostName,
        http: httpInfo,
        key,
        params,
        headers,
        query
      };
      const sendParams = ["OPTIONS", "GET", "DELETE"].includes(req.method)
        ? baseParams
        : Object.assign(baseParams, {
          body
        });

      try {
        await reqHTTP.post("/in", {
          body: sendParams
        });
      } catch (err) { } // eslint-disable-line
    };
  };

  const makeInterceptOutput = hostName => {
    return async (res, key, body) => {
      try {
        await reqHTTP.post("/out", {
          body: {
            hostName,
            key,
            headers: res._headers,
            statusCode: res.statusCode,
            body: body
          }
        });
      } catch (err) { } // eslint-disable-line
    };
  };

  return {
    inputInterceptor: makeInterceptInput(appName),
    outputInterceptor: makeInterceptOutput(appName)
  };
};

module.exports = makeInterceptor;
