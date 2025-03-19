import { Router } from 'express';
import * as pingController from '../controllers/ping';
import * as authController from '../controllers/auth';

const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);

mainRouter.post('/auth/login', authController.login)

export default mainRouter;