"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const mongoose = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
/**
 * express application
 * @param port
 * @param middlewares
 * @param routes
 */
class App {
    // used to initialize the application!
    constructor(port, middlewares = [], routes = []) {
        this.port = port;
        this.middlewares = middlewares;
        this.routes = routes;
        // should we define the Type also?
        this.app = express();
        this.apiPath = '/api';
        // 1. create application on a port.!!
        // 2. apply middleware -> bodyParser(), cors(), helmet()
        // 3. apply routes.
        this.app.get('/', (req, res) => {
            return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
                status: "working",
                alive: true
            });
        });
        this.applyMiddleware();
        this.applyRoutes();
    }
    applyMiddleware() {
        this.middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }
    applyRoutes() {
        this.routes.forEach(({ path, router }) => {
            if (path[0] === '/') {
                path = path.substring(1);
            }
            const _path = `${this.apiPath}/${path}`;
            this.app.use(_path, router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        });
    }
    /**
     * Creates a connection to a MongoDB instance using mongoose
     * @param uri MongoDB connection string
    */
    mongoDB(uri) {
        const connect = () => {
            mongoose.set('strictQuery', false);
            mongoose.connect(uri).then(() => {
                console.log("DB connected successfully.");
            }).catch((error) => {
                console.log(error);
                return process.exit(1);
            });
        };
        connect();
        // event listener.
        mongoose.connection.on("disconnected", connect);
    }
}
exports.App = App;
