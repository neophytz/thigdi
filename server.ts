const dotenv = require("dotenv");
dotenv.config();

import { App } from './src/app'
import { routes } from './src/routes';
import {middlewares} from './src/middleware';

const PORT = parseInt(process.env.PORT || '8080');
const MONGO_URI = process.env.DB_URI;

// object of app.
const app = new App(PORT, middlewares, routes);

app.listen();

// explicit typecasting.
app.mongoDB(MONGO_URI as string)