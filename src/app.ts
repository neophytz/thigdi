const express = require("express");
const mongoose = require("mongoose");

import { Application } from "express";
import { IRoute } from './types';


/**
 * express application
 * @param port
 * @param middlewares
 * @param routes
 */
export class App {
    // should we define the Type also?
    private app: Application = express();
    private apiPath: string = '/api'
    // used to initialize the application!
    constructor(
        private port: number,
        private middlewares: Array<any> = [],
        private routes: Array<IRoute> = []
    ){
        // 1. create application on a port.!!
        // 2. apply middleware -> bodyParser(), cors(), helmet()
        // 3. apply routes.
        this.applyMiddleware();
        this.applyRoutes();
    }

    private applyMiddleware(){
        this.middlewares.forEach(middleware => {
            this.app.use(middleware)
        })
    }
    
    private applyRoutes() {
        this.routes.forEach(({path, router}) => {
            if (path[0] === '/'){
                path = path.substring(1)
            }
            const _path = `${this.apiPath}/${path}`
            this.app.use(_path, router);
        })
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        })
    }

    /**
     * Creates a connection to a MongoDB instance using mongoose
     * @param uri MongoDB connection string
    */
    public mongoDB(uri: string) {
        const connect = () => {
            mongoose.set('strictQuery', false);
            mongoose.connect(uri).then(() => {
                console.log("DB connected successfully.")
            }).catch((error: Error) => {
                console.log(error);
                return process.exit(1);
            });
        };

        connect();

        // event listener.
        mongoose.connection.on("disconnected", connect);
    }

}
