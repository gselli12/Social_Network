var cookieSession = require("cookie-session");
const compression = require('compression');
const bodyParser = require('body-parser');
const csurf = require("csurf");

var middleware = (app) => {
    app.use(require("cookie-parser")());

    app.use(cookieSession({
        secret: "secret"
    }));

    app.use(bodyParser.json());

    app.use(compression());

    app.use(csurf());

    app.use((req, res, next) => {
        res.cookie("myHomemadeCookie", req.csrfToken());
        next();
    });


};

module.exports.middleware = middleware;
