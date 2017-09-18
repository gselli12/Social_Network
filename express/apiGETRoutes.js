const {getOtherUserData, checkFriendshipStatus, getFriends, getUsersByIds, getInitialChat, addComment} = require("../sql/dbqueries.js");


var apiGETRoutes = (app, io) => {

    app.get("/api/user", (req, res) => {
        const {id, first, last, bio, image} = req.session.user;
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
                    friends[id].image = friend.image;
                    friends[id].status = friend.status;
                });
                res.json({
                    friends
                });
            });
    });


    //SOCKET IO STUFF
    let onlineUsers = [];
    app.get("/connected/:socketId", (req, res) => {
        let socketId = req.params.socketId;
        let userId = req.session.user.id;
        const socketAlreadyThere = onlineUsers.some(user => user.socketId == socketId);
        const userAlreadyThere = onlineUsers.some(user => user.userId == userId);


        getInitialChat()
            .then(results => {
                io.sockets.emit("chatMessages", results.rows);
                console.log("chatMessages emit", results.rows);
            });

        if(!socketAlreadyThere && io.sockets.sockets[socketId]) {
            onlineUsers.push({
                socketId,
                userId
            });

            let ids = onlineUsers.map(user => user.userId);

            getUsersByIds(ids)
                .then((users) => {
                    io.sockets.sockets[socketId].emit("onlineUsers", users.rows);
                });
            let {id, first, last} = req.session.user;

            let image =  req.session.user.image;
            console.log("image");

            !userAlreadyThere && io.sockets.emit("userJoined", {
                id, first, last, image
            });

        }

        res.json({
            success: true
        });
    });


    io.on("connection", (socket) => {

        socket.on("addComment", (data) => {
            const {id, image, first, last, comment} = data;
            addComment([id, comment])
                .then(() => {
                    console.log("comment aded", image);

                    socket.emit("chatMessage", {
                        first, last, comment, image
                    });
                });
        });

        socket.on("disconnect", () => {
            var index = onlineUsers.findIndex(user => user.socketId === socket.id);
            var userId;
            if (index > -1) {
                userId = onlineUsers[index].userId;
                onlineUsers.splice(index, 1);
            }
            if (index > -1 && !onlineUsers.some(user => {return user.userId == userId;})) {
                socket.broadcast.emit("userLeft", {
                    userLeft: userId
                });
            }
        });
    });


};

module.exports.apiGETRoutes = apiGETRoutes;
