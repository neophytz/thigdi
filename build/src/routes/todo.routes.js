"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = require("express");
exports.todoRouter = (0, express_1.Router)();
const todo_schema_1 = require("../schemas/todo.schema");
const crud_controller_1 = require("../controller/crud.controller");
const middleware_1 = require("../middleware");
class TodoController extends crud_controller_1.CRUDController {
}
const _todoController = new TodoController(todo_schema_1.Todo);
exports.todoRouter.get('/all', (req, res) => _todoController.get(res, {}));
exports.todoRouter.get('/get/:product_id', (req, res) => _todoController.getById(res, req.params.product_id));
exports.todoRouter.put('/update/:product_id', (req, res) => _todoController.update(res, req.params.product_id, req.body));
exports.todoRouter.post('/create', (0, middleware_1.zodValidator)(todo_schema_1.todoValidator), (req, res) => _todoController.create(res, req.body));
exports.todoRouter.delete('/delete/:product_id', (req, res) => _todoController.delete(res, req.params.product_id));
