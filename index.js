'use strict';

const hijack = require("hijackresponse");
const shortid = require("shortid");

const interceptorMaker = require('./interceptor');

const middleware = (hostName, serverUrl) => {
  const { inputInterceptor, outputInterceptor } = interceptorMaker(serverUrl, hostName);
  return (req, res, next) => {
    const requestKey = shortid.generate();

    inputInterceptor(req, requestKey)
      .catch(err => console.log('Error Interceptor:', err.message));

    hijack(res, function (err, _res) {
      if (err) {
        _res.unhijack();
        return next(err);
      }

      let chunks = [];
      _res.on("data", function (data) {
        chunks.push(data);
      });

      _res.on("end", function () {
        let response = Buffer.concat(chunks).toString("utf8");
        let body;

        try {
          body = JSON.parse(response);
        } catch (e) { } // eslint-disable-line

        outputInterceptor(_res, requestKey, body || JSON.stringify(response))
          .catch(err => console.log('Error Interceptor:', err.message));
        _res.json(body);
      });
    });

    next();
  };
};

module.exports = middleware;