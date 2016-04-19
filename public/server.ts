/// <reference path="typings/main.d.ts"/>

import express = require('express');
import bodyParser = require('body-parser');
import path = require('path');
import mongoose = require('mongoose');
import express_promise = require('express-promise');
import passport = require('passport');

import {App} from './server/assignment/app';
import {Cafe} from './server/cafe/cafe';

let connectionString = 'mongodb://127.0.0.1:27017/webdevelopment';
let ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
let port: number = process.env.OPENSHIFT_NODEJS_PORT || 3000;
let app = express();

// Use remote connection string if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// Connect to the database
let db = mongoose.connect(connectionString);

app.use("/", express.static(path.resolve(__dirname, "../homepage")));
app.use("/assignment", express.static(path.resolve(__dirname, "./assignment")));
app.use("/cafe", express.static(path.resolve(__dirname, "./cafe")));
app.use("/node_modules", express.static(path.resolve(__dirname, "../../node_modules")));

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express_promise());
app.use(passport.initialize());

app.get("/assignment/*", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, './assignment/index.html'));
});
app.get("/cafe/*", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, './cafe/index.html'));
});
new App(app);
new Cafe(app);
app.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../homepage/index.html'));
});

let server = app.listen(port, ipaddress, () => {
    console.log("Listening on " + ipaddress + ", server_port " + port);
});
