# Express Interceptor
Simple expressjs interceptor middleware to grab information from outside and to outside of your express application

## Installation

Require node version `6` or higher

> npm i expressinterceptor


Then attach the middleware on your express application middleware.

    if (env !== 'production') {
      const middleware = require('expressinterceptor')('MyWebsite');
      app.use(middleware);
    }

This setting will point out to express interceptor server which default set to `localhost:1831`. You can also change it if you have a different settings on your server interceptor by passing an optional parameter.

    if (env !== 'production') {
      const middleware = require('expressinterceptor')('MyWebsite', 'http://localhost:8080');
      app.use(middleware);
    }

And you're ready to go to view the log data via [express interceptor server](https://github.com/slaveofcode/express-interceptor-server)

## License

MIT License

Copyright 2018 Aditya Kresna Permana

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
