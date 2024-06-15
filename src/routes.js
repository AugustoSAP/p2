
import {Router} from 'express';
import Usecontroller from './app/controller/user.controller';
import SessionController from './app/controller/SessionController';
import ProductController from './app/controller/ProductController';
import authMiddleware from './middlewares/auth';
import CategoryController from './app/controller/CategoryController';
import OrderController from './app/controller/OrderController';


const routes = new Router()

routes.post('/users', Usecontroller.store)
routes.post('/session', SessionController.store)
routes.post('/products', ProductController.store)
routes.post('/orders', OrderController.store)
routes.get('/categories', CategoryController.index)
routes.get('/products', authMiddleware, ProductController.index)

   
    

export default routes