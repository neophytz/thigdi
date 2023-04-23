"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
exports.userRouter = (0, express_1.Router)();
const user_schema_1 = require("../schemas/user.schema");
const crud_controller_1 = require("../controller/crud.controller");
const middleware_1 = require("../middleware");
class UserController extends crud_controller_1.CRUDController {
}
const _userController = new UserController(user_schema_1.User);
exports.userRouter.get('/all', (req, res) => _userController.get(res, {}));
exports.userRouter.get('/get/:product_id', (req, res) => _userController.getById(res, req.params.product_id));
exports.userRouter.put('/update/:product_id', (req, res) => _userController.update(res, req.params.product_id, req.body));
exports.userRouter.post('/create', (0, middleware_1.zodValidator)(user_schema_1.userValidator), (req, res) => _userController.create(res, req.body));
exports.userRouter.delete('/delete/:product_id', (req, res) => _userController.delete(res, req.params.product_id));
