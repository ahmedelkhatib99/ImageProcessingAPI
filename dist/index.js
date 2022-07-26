"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageMiddleware_1 = __importDefault(require("./middlewares/imageMiddleware"));
var app = (0, express_1.default)();
var port = 3000;
//API for resizing an image
app.get('/api/images', imageMiddleware_1.default, function (req, res) {
    try {
        //get filename, width and height
        var filename = req.query.filename;
        var width = parseInt(req.query.width);
        var height = parseInt(req.query.height);
        //respond with the resized image
        res.sendFile("D:/Courses/Nodejs Udacity/2-Backend Development with Node.js/Project/assets/thumb/".concat(width, "x").concat(height).concat(filename, ".jpg"));
    }
    catch (error) {
        res.status(400).json({ status: 0, message: error });
    }
});
app.listen(port, function () {
    console.log("app is running on localhost ".concat(port));
});
exports.default = app;
