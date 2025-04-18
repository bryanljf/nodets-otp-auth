import { Router } from 'express';
import * as pingController from '../controllers/ping';
import * as authController from '../controllers/auth';
import * as privateController from '../controllers/private'
import { verifyToken } from '../libs/jwt';

const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);

mainRouter.post('/auth/signin', authController.signin);

mainRouter.post('/auth/signup', authController.signup);

mainRouter.post('/auth/useOtp', authController.useOTP);

mainRouter.post('/private', verifyToken, privateController.verify)

export default mainRouter;      