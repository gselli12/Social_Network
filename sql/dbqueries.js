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
            console.log(results);
            return results;
        }
    });
};

module.exports.updatePic = updatePic;
module.exports.getHash = getHash;
module.exports.addNewUser = addNewUser;
