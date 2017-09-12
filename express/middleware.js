var cookieSession = require("cookie-session");
const compression = require('compression');
const bodyParser = require('body-parser');
const csurf = require("csurf");
const knox = require('knox');
let secrets = require('../secrets.json');
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');

var middleware = (app) => {
    app.use(require("cookie-parser")());

    app.use(cookieSession({
        secret: "secret"
    }));

    app.use(bodyParser.json());

    app.use(compression());

    app.use(csurf());

    app.use((req, res, next) => {
        res.cookie("myHomemadeCookie", req.csrfToken());
        next();
    });

};


//image upload AWS
var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/../uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'mypracticesn'
});

module.exports.uploadToS3 = (reqfile) => {
    return new Promise((resolve, reject) => {
        const s3Request = client.put(reqfile.filename, {
            'Content-Type': reqfile.mimetype,
            'Content-Length': reqfile.size,
            'x-amz-acl': 'public-read'
        });
        resolve(s3Request);
    });
};

module.exports.uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});

module.exports.middleware = middleware;
