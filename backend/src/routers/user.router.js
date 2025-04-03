import { Router } from 'express';
import { getAllUsersController, login, logoutController, register, userProfile } from '../controllers/user.controller.js';
import { authUser } from '../middlewear/auth.middlewear.js';


const router = Router();

router.route('/register').post(register)
router.route("/login").post(login)
router.route("/profile").get(authUser, userProfile)
router.route("/logout").get(authUser, logoutController)
router.get('/all', authUser, getAllUsersController);

export default router;