const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const {middleware} = require("./express/middleware.js");
const{postRoutes} = require("./express/postRoutes.js");
const {apiGETRoutes} = require("./express/apiGETRoutes.js");



//MIDDLEWARE
app.use(express.static(__dirname + "/public"));

if (process.env.NODE_ENV != 'production') {
    // app.use(require('./build'));
    app.use("/bundle.js", require("http-proxy-middleware")({
        target: 'http://localhost:8081/'
    }));
}

middleware(app);


//ROUTES
app.get("/", (req, res) => {
    if(!req.session.user) {
        return res.redirect("/welcome");
    }
    res.sendFile(__dirname + "/index.html");
});


app.get("/welcome", (req, res) => {
    if(req.session.user) {
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/index.html");
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

apiGETRoutes(app);

postRoutes(app, io);


//KEEP this at the bottom:
app.get('*', function(req, res) {
    if(!req.session.user) {
        return res.redirect("/welcome");
    }
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, function() {
    console.log("Listening on port 8080");
});
