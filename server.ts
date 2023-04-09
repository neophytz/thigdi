const dotenv = require("dotenv");
dotenv.config();

import { App } from './src/app'
import { routes } from './src/routes';

const PORT = parseInt(process.env.PORT || '8080');

// object of app.
const app = new App(PORT, [], routes);

app.listen();