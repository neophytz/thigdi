import {Request, Response, Router} from 'express';

export const userRouter = Router();

import {IUser, User} from '../schemas/user.schema';
import {CRUDController} from '../controller/crud.controller';

class UserController extends CRUDController<IUser> {}
const _userController = new UserController(User);

userRouter.get('/all', (req: Request, res: Response) => _userController.get(res, {}))
userRouter.get('/get/:product_id', (req: Request, res: Response) => _userController.getById(res, req.params.product_id))
userRouter.put('/update/:product_id', (req: Request, res: Response) => _userController.update(res, req.params.product_id, req.body))
userRouter.post('/create', (req: Request, res: Response) => _userController.create(res, req.body))
userRouter.delete('/delete/:product_id', (req: Request, res: Response) => _userController.delete(res, req.params.product_id)) 

