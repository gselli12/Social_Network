
const {hashPassword, checkPassword} = require("../Config/hashing.js");
const {updatePic, addNewUser, getHash, updateBio, newFriendRequest, changeFriendshipStatus} = require("../sql/dbqueries.js");
const {uploadToS3, uploader} = require("../express/middleware.js");

const fs = require('fs');


//ROUTES
var postRoutes = (app) => {

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



    app.post("/bio", (req, res) => {
        let data = [req.body.bio, req.session.user.email];

        updateBio(data)
            .then((resp) => {
                console.log(resp);
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

};

module.exports.postRoutes = postRoutes;
