import {Request, Response, Router} from 'express';

export const todoRouter = Router();

import {ITodo, Todo, todoValidator} from '../schemas/todo.schema';
import {CRUDController} from '../controller/crud.controller';
import { zodValidator } from '../middleware';

class TodoController extends CRUDController<ITodo> {}
const _todoController = new TodoController(Todo);

todoRouter.get('/all', (req: Request, res: Response) => _todoController.get(res, {}))
todoRouter.get('/get/:product_id', (req: Request, res: Response) => _todoController.getById(res, req.params.product_id))
todoRouter.put('/update/:product_id', (req: Request, res: Response) => _todoController.update(res, req.params.product_id, req.body))
todoRouter.post('/create', zodValidator(todoValidator), (req: Request, res: Response) => _todoController.create(res, req.body))
todoRouter.delete('/delete/:product_id', (req: Request, res: Response) => _todoController.delete(res, req.params.product_id)) 

