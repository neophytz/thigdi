import { IRoute } from "../types";
import { todoRouter } from './todo.routes';

export const routes: Array<IRoute> = [
    {
        path: 'v1/todo',
        router: todoRouter
    },
];