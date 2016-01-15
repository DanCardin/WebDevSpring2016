var express = require("express");
var path = require("path");
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var app = express();
app.use("/app", express.static(path.resolve(__dirname, "../client/app")));
app.use("/node_modules", express.static(path.resolve(__dirname, "../node_modules")));
var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, "../client/index.html"));
};
app.get("/*", renderIndex);
var server = app.listen(port, ipaddress, function () {
    console.log("Listening on " + ipaddress + ", server_port " + port);
});
//# sourceMappingURL=server.js.map