const {getOtherUserData, checkFriendshipStatus, getFriends} = require("../sql/dbqueries.js");


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
                let {first, last, image, bio} = results[0].rows[0];

                let friendshipStatus;
                let isSender;
                if(!results[1].rows[0]) {
                    friendshipStatus = "NOT FRIENDS";
                } else {
                    friendshipStatus = results[1].rows[0].status;
                    let sender = results[1].rows[0].sender_id;
                    if(sender == id){
                        isSender = false;
                    } else {
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

    app.get("/api/friends", (req, res) => {
        let id = req.session.user.id;
        getFriends([id])
            .then((results) => {
                let friends = [];
                results.rows.forEach((friend, id) => {
                    friends[id] = {};
                    friends[id].id = friend.id;
                    friends[id].first = friend.first;
                    friends[id].last = friend.last;
                    friends[id].image = "https://mypracticesn.s3.amazonaws.com/"+friend.image;
                    friends[id].status = friend.status;
                });
                res.json({
                    friends
                });
            });
    });

};

module.exports.apiGETRoutes = apiGETRoutes;
