import { Router } from 'express';
import { loginCtrl } from '../controller/auth.controller';
import { profileCtrl } from '../controller/user.controller';
import authorizationMw from '../middleware/authorization.mw';

const router = Router();

router.post('/login', loginCtrl);
router.get('/profile', authorizationMw.verifyJWT, profileCtrl);

export default router;
