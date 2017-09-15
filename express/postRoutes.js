
const {hashPassword, checkPassword} = require("../Config/hashing.js");
const {updatePic, addNewUser, getHash, updateBio, newFriendRequest, changeFriendshipStatus, getUsersByIds} = require("../sql/dbqueries.js");
const {uploadToS3, uploader} = require("../express/middleware.js");

const fs = require('fs');


//ROUTES
var postRoutes = (app, io) => {

    app.post("/register", (req, res) => {
        const {first, last, email, pw} = req.body;

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



        let {email, pw} = req.body;

        getHash([email])
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
            .then(() => {
                req.session.user.bio = req.body.bio;
                console.log(req.session.user.bio);
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    success: false
                });
            });
    });


    app.post("/user/:id/:friendshipbutton", (req, res) => {
        var request = req.params.friendshipbutton;

        if(request == "sendfriendrequest") {
            let data = [req.session.user.id, req.params.id, "PENDING"];
            newFriendRequest(data)
                .catch((err) => {
                    console.log(err);
                    res.json({
                        success: false
                    });
                });
        } else {
            var status;
            if (request == "acceptfriendrequest") {
                status = "FRIENDS";
            } else if (request == "resendfriendrequest") {
                status = "PENDING";
            } else if(request == "unfriend") {
                status = "DELETED";
            } else if(request == "cancelfriendrequest") {
                status = "CANCELED";
            } else if(request == "rejectfriendrequest") {
                status = "REJECTED";
            } else {
                console.log("you mistyped your post request");
            }

            let data = [req.session.user.id, req.params.id, status];

            changeFriendshipStatus(data)
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
        }
    });

    let onlineUsers = [];
    app.get("/connected/:socketId", (req, res) => {
        let socketId = req.params.socketId;
        let userId = req.session.user.id;
        const socketAlreadyThere = onlineUsers.some(user => user.socketId == socketId);
        const userAlreadyThere = onlineUsers.some(user => user.userId == userId);

        if(!socketAlreadyThere && io.sockets.sockets[socketId]) {
            onlineUsers.push({
                socketId,
                userId
            });

            let ids = onlineUsers.map(user => user.userId);
            getUsersByIds(ids)
                .then((users) => {
                    io.sockets.sockets[socketId].emit("onlineUsers", users.rows);
                    console.log("emit onlineUsers");
                });
            !userAlreadyThere && io.sockets.emit("userJoined");
        }
        console.log("onlineUsers", onlineUsers);
        res.json({
            success: true
        });
    });

    app.post("/disconnect/:socketId", (req, res) => {
        let socketId = req.params.socketId;
        let userId = req.session.user.id;
        console.log("disconnect");
    })

};

module.exports.postRoutes = postRoutes;
