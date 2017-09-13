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
    return db.query("SELECT image, first, last, bio FROM users WHERE id = ($1);", id, (err, results) => {
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
    return db.query("UPDATE friendships SET sender_id = ($1), recipient_id = ($2), status = ($3) WHERE sender_id = ($1) AND recipient_id = ($2) OR recipient_id = ($1) AND sender_id = ($2);", data, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            return results;
        }
    });
};

let getFriends = (id) => {
    return db.query("SELECT users.id, first, last, image, status FROM friendships JOIN users ON (status = 'PENDING' AND recipient_id = $1 AND sender_id = users.id) OR (status = 'FRIENDS' AND recipient_id = $1 AND sender_id = users.id) OR (status = 'FRIENDS' AND sender_id = $1 AND recipient_id = users.id)", id, (err, results) => {
        if(err) {
            console.log(err);
        } else {
            console.log(results);
            return results;
        }
    });
};



module.exports.getFriends = getFriends;
module.exports.changeFriendshipStatus = changeFriendshipStatus;
module.exports.checkFriendshipStatus = checkFriendshipStatus;
module.exports.newFriendRequest = newFriendRequest;
module.exports.getOtherUserData = getOtherUserData;
module.exports.updateBio = updateBio;
module.exports.updatePic = updatePic;
module.exports.getHash = getHash;
module.exports.addNewUser = addNewUser;
