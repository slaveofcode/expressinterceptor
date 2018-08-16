'use strict';

const hijack = require("hijackresponse");
const shortid = require("shortid");

const interceptorMaker = require('./interceptor');

const middleware = (serverUrl, hostName) => {
  const { inputInterceptor, outputInterceptor } = interceptorMaker(serverUrl, hostName);
  return (req, res, next) => {
    const requestKey = shortid.generate();

    inputInterceptor(req, requestKey);

    hijack(res, function(err, _res) {
      if (err) {
        _res.unhijack();
        return next(err);
      }

      let chunks = [];
      _res.on("data", function(data) {
        chunks.push(data);
      });

      _res.on("end", function() {
        let response = Buffer.concat(chunks).toString("utf8");
        let body;

        try {
          body = JSON.parse(response);
        } catch (e) {} // eslint-disable-line

        outputInterceptor(_res, requestKey, body);

        _res.json(body);
      });
    });

    next();
  };
};

module.exports = middleware;