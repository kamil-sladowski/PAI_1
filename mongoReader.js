var mongooseDrv = require("mongoose");
var schema = mongooseDrv.Schema;
const session = require('express-session');
const passport = require('passport');

const config = require('./config/database');
mongooseDrv.connect(config.database);
var connection = mongooseDrv.connection;

module.exports = {
    mongoRead: function (res) {
        if (connection !== "undefined") {
            console.log(connection.readyState.toString());
            var path = require("path");
            var grid = require("gridfs-stream");
            var fs = require("fs");
            grid.mongo = mongooseDrv.mongo;
            connection.once("open", () => {
                console.log("Connection Open");
                var gridfs = grid(connection.db);
                if (gridfs) {
                    var fsstreamwrite = fs.createWriteStream(
                        path.join(__dirname, "./images/dog.jpeg")
                    );

                    var readstream = gridfs.createReadStream({
                        filename: "dog.jpeg"
                    });
                    readstream.pipe(fsstreamwrite);
                    readstream.on("close", function (file) {

                    var filename = "dog.jpeg";

                    res.json({ _id : file._id, filename : filename});
                    console.log("File Read successfully from database");

                    });
                } else {
                    console.log("Sorry No Grid FS Object");
                }
            });
        } else {

            console.log('Sorry not connected');
        }
        console.log("done");
    }
};
