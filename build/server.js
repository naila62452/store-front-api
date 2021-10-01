"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var user_1 = __importDefault(require("./handler/user"));
var products_1 = __importDefault(require("./handler/products"));
var orders_1 = __importDefault(require("./handler/orders"));
var dashboard_1 = __importDefault(require("./handler/dashboard"));
var app = (0, express_1.default)();
var address = 'http://localhost:3000';
app.use(body_parser_1.default.urlencoded({ extended: false }));
(0, user_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
(0, dashboard_1.default)(app);
app.listen(3000, function () {
    console.log("starting app on: " + address);
});
exports.default = app;
