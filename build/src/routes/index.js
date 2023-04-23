"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const todo_routes_1 = require("./todo.routes");
const user_routes_1 = require("./user.routes");
exports.routes = [
    {
        path: 'v1/todo',
        router: todo_routes_1.todoRouter
    },
    {
        path: 'v1/user',
        router: user_routes_1.userRouter
    },
];
