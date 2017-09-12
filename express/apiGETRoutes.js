const {getOtherUserData, checkFriendshipStatus} = require("../sql/dbqueries.js");


var apiGETRoutes = (app) => {

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
};

module.exports.apiGETRoutes = apiGETRoutes;
