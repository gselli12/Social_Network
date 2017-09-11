const express = require('express');
const app = express();
const {hashPassword, checkPassword} = require("./Config/hashing.js");
const {updatePic, addNewUser, getHash, updateBio, getOtherUserData, newFriendRequest, checkFriendshipStatus, changeFriendshipStatus} = require("./sql/dbqueries.js");
const {middleware} = require("./express/middleware.js");
const knox = require('knox');
let secrets = require('./secrets.json');
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
const fs = require('fs');

//AWS
const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'mypracticesn'
});

var uploadToS3 = (reqfile) => {
    return new Promise((resolve, reject) => {
        const s3Request = client.put(reqfile.filename, {
            'Content-Type': reqfile.mimetype,
            'Content-Length': reqfile.size,
            'x-amz-acl': 'public-read'
        });
        resolve(s3Request);
    });
};

var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});


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
                    const {id, email, image, bio} = result.rows[0];
                    req.session.user = {
                        id,
                        email,
                        first,
                        last,
                        image,
                        bio
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


app.post("/login" , (req, res) => {

    let email = [req.body.email];
    let pw = req.body.pw;

    getHash(email)
        .then((hash) => {
            const {id, email, first, last, image, bio} = hash.rows[0];

            checkPassword(pw, hash.rows[0].pw)
                .then((result) => {
                    if(result) {
                        req.session.user = {
                            id,
                            email,
                            first,
                            last,
                            image,
                            bio
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

app.post("/upload", uploader.single('file'), (req, res) => {
    if(req.file) {
        uploadToS3(req.file)
            .then((s3Request) => {
                const readStream = fs.createReadStream(req.file.path);
                readStream.pipe(s3Request);
                s3Request.on("response", s3Response => {
                    const wasSuccessful = s3Response.statusCode == 200;
                    console.log("statuscode", s3Response.statusCode);
                    res.json({
                        success: wasSuccessful
                    });
                });
            })
            .then(() => {
                let data = [req.file.filename, req.session.user.email];
                req.session.user.image = req.file.filename;
                updatePic(data);
            });
    } else {
        res.json({
            success: false
        });
    }
});

app.get("/api/user", (req, res) => {
    const {id, first, last, image, bio} = req.session.user;
    res.json({
        id,
        first,
        last,
        image,
        bio
    });
});

app.post("/bio", (req, res) => {
    let data = [req.body.bio, req.session.user.email];

    updateBio(data)
        .then((resp) => {
            console.log(resp);
        });
});

app.get("/api/user/:id", (req, res) => {
    let id = req.params.id;
    let data = [id, req.session.user.id];

    Promise.all([getOtherUserData([id]),
        checkFriendshipStatus(data)])

        .then((results) => {
            console.log("results", results[1].rows[0]);
            let {first, last, image, bio} = results[0].rows[0];

            let friendshipStatus;
            let isSender;
            if(!results[1].rows[0]) {
                friendshipStatus = "NOT FRIENDS";
            } else {
                friendshipStatus = results[1].rows[0].status;
                let sender = results[1].rows[0].sender_id;
                if(sender == id){
                    console.log("is not sender");
                    isSender = false;
                } else {
                    console.log("is sender");
                    isSender = true;
                }

            }

            res.json({
                first,
                last,
                image,
                bio,
                friendshipStatus,
                isSender
            });
        });
});

app.post("/user/:id/sendfriendrequest", (req, res) => {
    let data = [req.session.user.id, req.params.id, "PENDING"];
    console.log(data);
    newFriendRequest(data)
        .then((resp) => {
            console.log(resp);
        });
});

app.post("/user/:id/acceptfriendrequest", (req, res) => {
    let data = [req.session.user.id, req.params.id, "FRIENDS"];
    console.log(data);
    changeFriendshipStatus(data)
        .then((resp) => {
            console.log(resp);
        });
});

app.post("/user/:id/resendfriendrequest", (req, res) => {
    let data = [req.session.user.id, req.params.id, "PENDING"];
    console.log(data);
    changeFriendshipStatus(data)
        .then((resp) => {
            console.log(resp);
        });
});

app.post("/user/:id/unfriend", (req, res) => {
    let data = [req.session.user.id, req.params.id, "DELETED"];
    console.log(data);
    changeFriendshipStatus(data)
        .then((resp) => {
            console.log(resp);
        });
});

app.post("/user/:id/cancelfriendrequest", (req, res) => {
    let data = [req.session.user.id, req.params.id, "CANCELED"];
    console.log(data);
    changeFriendshipStatus(data)
        .then((resp) => {
            console.log(resp);
        });
});

app.post("/user/:id/rejectfriendrequest", (req, res) => {
    let data = [req.session.user.id, req.params.id, "REJECTED"];
    console.log("post");
    changeFriendshipStatus(data)
        .then((resp) => {
            console.log(resp);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});


//KEEP this at the bottom:
app.get('*', function(req, res) {
    if(!req.session.user) {
        return res.redirect("/welcome");
    }
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("Listening on port 8080");
});
