var rp = require('request-promise');
const cheerio = require('cheerio');
const {hashPassword, checkPassword} = require("../Config/hashing.js");
const {updatePic, addNewUser, getHash, updateBio, newFriendRequest, changeFriendshipStatus, addComment, addWallPost, addImageToWall} = require("../sql/dbqueries.js");
const {uploadToS3, uploader} = require("../express/middleware.js");

const fs = require('fs');


//ROUTES
var postRoutes = (app) => {

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
                    let image = "https://mypracticesn.s3.amazonaws.com/" + req.file.filename
                    let data = [image, req.session.user.email];
                    req.session.user.image = image;
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
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    success: false
                });
            });
    });

    app.post("/api/user/wallpost/:id", (req, res) => {
        const {first, last, profileId, image, postWriting, submitType} = req.body.post;
        const writerId = req.session.user.id;
        let data = [writerId, profileId, postWriting, "none", "none"];

        if(submitType == "text" || submitType == undefined) {
            addWallPost(data);
        } else if(submitType == "link") {
            var htmlBody;
            var link = postWriting;

            rp(link)
                .then(resp => {
                    htmlBody = resp;
                    const $ = cheerio.load(htmlBody);
                    var image, title, description;

                    if($('meta[property="og:title"]').attr("content")){
                        title = $('meta[property="og:title"]').attr("content");
                    } else {
                        title = $('title')[0].children[0].data;
                    }
                    if($('meta[property="og:image"]').attr("content")) {
                        image = $('meta[property="og:image"]').attr("content");
                    } else {
                        image = "no image";
                    }
                    if($('meta[property="og:description"]').attr("content")) {
                        description = $('meta[property="og:description"]').attr("content");
                    } else {
                        description = $('h1')[0].children[0].data;
                    }

                    let post = title + "\n" + description;
                    let data = [writerId, profileId, post, image, link];
                    addWallPost(data);
                });
        }
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




};

module.exports.postRoutes = postRoutes;
