const spicedPG = require("spiced-pg");

let db;
if(process.env.DATABASE_URL) {
    db = spicedPG(process.env.DATABASE_URL);
} else {
    const secret = require("../secrets.json");
    db = spicedPG("postgres:" + secret.username + ":" + secret.password + "@localhost:5432/socialnetwork");
}

let addNewUser = (data) => {
    return db.query("INSERT INTO users (first, last, email, pw) VALUES ($1, $2, $3, $4) RETURNING id, email, first, last, image, bio;", data, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            return results;
        }
    });
};

let getHash = (email) => {
    return db.query("SELECT pw, email, id, first, last, image, bio FROM users WHERE email = ($1);", email, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            return results;
        }
    });
};

var updatePic = (data) => {
    return db.query("UPDATE users SET image = ($1) WHERE email = ($2);", data, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            return results;
        }
    });
};

var updateBio = (data) => {
    return db.query("UPDATE users SET bio = ($1) WHERE email = ($2);", data, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            return results;
        }
    });
};

var getOtherUserData = (id) => {
    return db.query(`SELECT image, first, last, bio
        FROM users
        WHERE id = ($1);`, id, (err, results) => {
            if(err) {
                console.log(err);
            } else {
                return results;
            }
        });
};

var checkFriendshipStatus = (data) => {
    return db.query("SELECT status, sender_id FROM friendships WHERE sender_id = ($1) AND recipient_id = ($2) OR recipient_id = ($1) AND sender_id = ($2)", data, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            return results;
        }
    });
};

var newFriendRequest = (data) => {
    return db.query("INSERT INTO friendships (sender_id, recipient_id, status) VALUES ($1, $2, $3);", data, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            return results;
        }
    });
};

var changeFriendshipStatus = (data) => {
    return db.query(`UPDATE friendships SET sender_id = ($1), recipient_id = ($2), status = ($3)
                    WHERE sender_id = ($1) AND recipient_id = ($2)
                    OR recipient_id = ($1) AND sender_id = ($2);`, data, (err, results) => {
            if(err) {
                console.log(err);
            } else {
                return results;
            }
        });
};

let getFriends = (id) => {
    return db.query(`SELECT users.id, first, last, image, status
                    FROM friendships
                    JOIN users
                    ON (status = 'PENDING' AND recipient_id = $1 AND sender_id = users.id)
                    OR (status = 'FRIENDS' AND recipient_id = $1 AND sender_id = users.id)
                    OR (status = 'FRIENDS' AND sender_id = $1 AND recipient_id = users.id);`, id, (err, results) => {
            if(err) {
                console.log(err);
            } else {
                return results;
            }
        });
};

let getUsersByIds = (ids) => {
    return db.query(`SELECT first, last, image, id
                    FROM users
                    WHERE id = ANY($1);`, [ids], (err, results) => {
            if(err) {
                console.log(err);
            } else {
                return results;
            }
        });
};

let getInitialChat = () => {
    return db.query(`SELECT users.id, first, last, image, comment, chat.timestamp
                    FROM users
                    JOIN chat
                    ON user_id = users.id
                    ORDER BY chat.timestamp DESC
                    LIMIT 10;`, null, (err, results) => {
            if(err) {
                console.log(err);
            } else {
                let array = results.rows.reverse();
                return array;
            }
        });
};

let addComment = (data) => {
    return db.query(`INSERT INTO chat (user_id, comment) VALUES ($1, $2) RETURNING timestamp;`, data, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            return results;
        }
    });
};

let getMatchingUsers = (data) => {
    return db.query(`SELECT first, last, image, id
                    FROM users
                    WHERE first ILIKE ($1);`, data, (err, results) => {
            if(err) {
                console.log(err);
            } else {
                return results.rows;
            }
        });
};

let addWallPost = (data) => {
    return db.query(`INSERT INTO wallposts (writer_id, profile_id, post, image, link) VALUES ($1, $2, $3, $4, $5)`, data, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            return results;
        }
    });
};

let getWallposts = (id) => {
    return db.query(`SELECT writer_id, post, first, last, users.image AS profile_pic, users.id, wallposts.timestamp, wallposts.image AS post_pic, link
        FROM wallposts
        JOIN users
        ON wallposts.writer_id = users.id
        WHERE wallposts.profile_id = ($1)
        ORDER BY wallposts.timestamp DESC
        LIMIT 10`, id, (err, results) => {
            if(err) {
                console.log(err);
            } else {
                return results;
            }
        });
};


module.exports.getWallposts = getWallposts;
module.exports.addWallPost = addWallPost;
module.exports.getMatchingUsers = getMatchingUsers;
module.exports.addComment = addComment;
module.exports.getInitialChat = getInitialChat,
module.exports.getUsersByIds = getUsersByIds;
module.exports.getFriends = getFriends;
module.exports.changeFriendshipStatus = changeFriendshipStatus;
module.exports.checkFriendshipStatus = checkFriendshipStatus;
module.exports.newFriendRequest = newFriendRequest;
module.exports.getOtherUserData = getOtherUserData;
module.exports.updateBio = updateBio;
module.exports.updatePic = updatePic;
module.exports.getHash = getHash;
module.exports.addNewUser = addNewUser;
