import { IRoute } from "../types";
import { todoRouter } from './todo.routes';
import { userRouter } from './user.routes';

export const routes: Array<IRoute> = [
    {
        path: 'v1/todo',
        router: todoRouter
    },
    {
        path: 'v1/user',
        router: userRouter
    },
];