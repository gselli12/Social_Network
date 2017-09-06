var cookieSession = require("cookie-session");
const compression = require('compression');
const bodyParser = require('body-parser');

var middleware = (app) => {
    app.use(cookieSession({
        name: "session",
        keys: ['id', 'email']
    }));

    app.use(bodyParser.json());

    app.use(compression());



};

module.exports.middleware = middleware;
