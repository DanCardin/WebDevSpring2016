import express = require("express");
import path = require("path");

let ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
let port: number = process.env.OPENSHIFT_NODEJS_PORT || 3000;
let app = express();

app.use("/app", express.static(path.resolve(__dirname, "./assignment")));
app.use("/cafe", express.static(path.resolve(__dirname, "./cafe")));
app.use("/node_modules", express.static(path.resolve(__dirname, "../node_modules")));

let assignment = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, "./assignment/index.html"));
};
let cafe = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, "./cafe/index.html"));
};

app.get("/cafe", cafe);
app.get("/*", assignment);

let server = app.listen(port, ipaddress, function() {
    console.log("Listening on " + ipaddress + ", server_port " + port);
});
