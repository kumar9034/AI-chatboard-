import { Router } from 'express';
import { login, logoutController, register, userProfile } from '../controllers/user.controller.js';
import { authUser } from '../middlewear/auth.middlewear.js';

const router = Router();

router.route('/register').post(register)
router.route("/login").post(login)
router.route("/profile").get(authUser, userProfile)
router.route("/logout").get(authUser, logoutController)

export default router;