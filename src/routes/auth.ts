import { Router, Request, Response } from 'express';
import { signup, signin, signout, profile} from '../controllers/auth.controller';
import { TokenValidation } from '../libs/verifyToken';

const router: Router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/profile', TokenValidation, profile);

export default router; 