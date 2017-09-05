const express = require('express');
const app = express();
const compression = require('compression');
const {hashPassword, checkPassword} = require("./hashing.js");
const {addNewUser} = require("./sql/dbqueries.js");
const bodyParser = require('body-parser');
var cookieSession = require("cookie-session");
var cookieParser = require("cookie-parser");


app.use(cookieSession({
    name: "session",
    keys: ['id', 'email']
}));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

app.use(express.static('./public'));

app.get("/test", (req, res) => {
    console.log(req.session);
    if(!req.session.user) {
        return res.redirect("/welcome");
    }
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/welcome", (req, res) => {
    console.log(req.session);
    if(req.session.user) {
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/register", (req, res) => {
    let first = req.body.first;
    let last = req.body.last;
    let email = req.body.email;
    let pw = req.body.pw;

    hashPassword(pw)
        .then((hash) => {
            let data = [first, last, email, hash];
            addNewUser(data)
                .then((result) => {
                    req.session.user = {
                        id: result.rows[0].id,
                        email: result.rows[0].email
                    };
                })
                .then(() => {
                    res.json({
                        success: true
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        success: false
                    });
                });
        });
});



app.listen(8080, function() {
    console.log("Listening on port 8080");
});
