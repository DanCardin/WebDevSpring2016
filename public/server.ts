import express = require("express");
import bodyParser = require("body-parser");
import path = require("path");
import {App} from './server/assignment/app';
import {Cafe} from './server/cafe/cafe';

let ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
let port: number = process.env.OPENSHIFT_NODEJS_PORT || 3000;
let app = express();

app.use("/assignment", express.static(path.resolve(__dirname, "./assignment")));
app.use("/cafe", express.static(path.resolve(__dirname, "./cafe")));
app.use("/node_modules", express.static(path.resolve(__dirname, "../../node_modules")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let assignment = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, "./assignment/index.html"));
    console.log('assignment')
};
let cafe = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, "./cafe/index.html"));
    console.log('server')
};
let index = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, "./index.html"));
    console.log('index', req.params)
};

app.get("/assignment/*", assignment);
app.get("/cafe/*", cafe);
new App(app);
new Cafe(app);
app.get("/", index);

let server = app.listen(port, ipaddress, function() {
    console.log("Listening on " + ipaddress + ", server_port " + port);
});
