// const {hashPassword, checkPassword} = require("../Config/hashing.js");
// const {addNewUser, getHash} = require("../sql/dbqueries.js");
// const express = require('express');
//
// let routes = (app) => {

    // app.use(express.static(__dirname + '/../'));
    //
    // app.get("/", (req, res) => {
    //     console.log("req.session", req.session);
    //     if(!req.session.user) {
    //         return res.redirect("/welcome");
    //     }
    //     res.sendFile(__dirname + "/../public/index.html");
    // });
    //
    //
    // app.get("/welcome", (req, res) => {
    //     console.log("req.session.user", req.session.user);
    //     if(req.session.user) {
    //         return res.redirect("/");
    //     }
    //     res.sendFile(__dirname + "/../public/index.html");
    // });
    //
    // app.get("/login", (req, res) => {
    //     console.log("req.session.user", req.session.user);
    //     if(req.session.user) {
    //         return res.redirect("/");
    //     }
    //     res.sendFile(__dirname + "/../public/index.html");
    // });
    //
    // app.post("/login" , (req, res) => {
    //
    //     let email = [req.body.email];
    //     let pw = req.body.pw;
    //
    //     getHash(email)
    //         .then((hash) => {
    //             console.log(hash.rows[0].pw);
    //             let id = hash.rows[0].id;
    //             let email = hash.rows[0].email;
    //             checkPassword(pw, hash.rows[0].pw)
    //                 .then((result) => {
    //                     if(result) {
    //                         req.session.user = {
    //                             id: id,
    //                             email: email
    //                         };
    //                         res.json({
    //                             success: true
    //                         });
    //                     } else {
    //                         res.json({
    //                             success: false
    //                         });
    //                     }
    //                 });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             res.json({
    //                 success: false
    //             });
    //         });
    //
    // });
    //
    // app.post("/register", (req, res) => {
    //     let first = req.body.first;
    //     let last = req.body.last;
    //     let email = req.body.email;
    //     let pw = req.body.pw;
    //
    //     hashPassword(pw)
    //         .then((hash) => {
    //             let data = [first, last, email, hash];
    //             addNewUser(data)
    //                 .then((result) => {
    //                     req.session.user = {
    //                         id: result.rows[0].id,
    //                         email: result.rows[0].email
    //                     };
    //                 })
    //                 .then(() => {
    //                     res.json({
    //                         success: true
    //                     });
    //                 })
    //                 .catch((err) => {
    //                     console.log(err);
    //                     res.json({
    //                         success: false
    //                     });
    //                 });
    //         });
    // });
    //
    // app.get("/logout", (req, res) => {
    //     req.session = null;
    //     res.redirect("/welcome");
    // });
// };
//
// module.exports.routes = routes;
