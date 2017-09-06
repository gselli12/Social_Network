var cookieSession = require("cookie-session");
const compression = require('compression');
const bodyParser = require('body-parser');

var middleware = (app) => {
    app.use(require("cookie-parser")());

    app.use(cookieSession({
        secret: "secret"
    }));

    app.use(bodyParser.json());

    app.use(compression());



};

module.exports.middleware = middleware;
