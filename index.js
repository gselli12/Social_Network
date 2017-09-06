const express = require('express');
const app = express();
const {hashPassword, checkPassword} = require("./Config/hashing.js");
const {addNewUser, getHash} = require("./sql/dbqueries.js");
const {middleware} = require("./express/middleware.js");



//MIDDLEWARE
app.use(express.static(__dirname + "/public"));

if (process.env.NODE_ENV != 'production') {
    app.use(require('./build'));
}

middleware(app);


//ROUTES
app.get("/", (req, res) => {
    console.log("req.session", req.session);
    if(!req.session.user) {
        return res.redirect("/welcome");
    }
    res.sendFile(__dirname + "/index.html");
});


app.get("/welcome", (req, res) => {
    console.log("req.session.user", req.session.user);
    if(req.session.user) {
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/index.html");
});


app.post("/login" , (req, res) => {

    let email = [req.body.email];
    let pw = req.body.pw;

    getHash(email)
        .then((hash) => {
            console.log(hash.rows[0].pw);
            let id = hash.rows[0].id;
            let email = hash.rows[0].email;
            checkPassword(pw, hash.rows[0].pw)
                .then((result) => {
                    if(result) {
                        req.session.user = {
                            id: id,
                            email: email
                        };
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            success: false
                        });
                    }
                });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                success: false
            });
        });

});

app.post("/register", (req, res) => {
    let first = req.body.first;
    let last = req.body.last;
    let email = req.body.email;
    let pw = req.body.pw;

    hashPassword(pw)
        .then((hash) => {
            let data = [first, last, email, hash];
            console.log(data);
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

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});





app.listen(8080, function() {
    console.log("Listening on port 8080");
});
