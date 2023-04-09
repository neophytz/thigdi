const express = require("express");
import { Application } from "express";
import { IRoute } from './types';

/**
 * 0. 
 * 1. middleware configuration?
 * - bodyparser?
 * - cors?
 * 
 * 2. routes
 * - 
 * 
 * 3. database connection?
 * - 
 * 
 * 4. Export that application, so that it can be used in server.ts file.
*/

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
}
