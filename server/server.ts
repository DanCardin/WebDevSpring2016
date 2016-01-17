import express = require("express");
import path = require("path");
let ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
let port: number = process.env.OPENSHIFT_NODEJS_PORT || 3000;
let app = express();

app.use("/app", express.static(path.resolve(__dirname, "./app")));
app.use("/css", express.static(path.resolve(__dirname, "./css")));
app.use("/public", express.static(path.resolve(__dirname, "./")));
app.use("/node_modules", express.static(path.resolve(__dirname, "../node_modules")));

let renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, "./index.html"));
};

app.get("/*", renderIndex);

let server = app.listen(port, ipaddress, function() {
    console.log("Listening on " + ipaddress + ", server_port " + port);
});
