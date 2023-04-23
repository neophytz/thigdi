"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const app_1 = require("./src/app");
const routes_1 = require("./src/routes");
const middleware_1 = require("./src/middleware");
const PORT = parseInt(process.env.PORT || '8080');
const MONGO_URI = process.env.DB_URI;
// object of app.
const app = new app_1.App(PORT, middleware_1.middlewares, routes_1.routes);
app.listen();
// explicit typecasting.
app.mongoDB(MONGO_URI);
