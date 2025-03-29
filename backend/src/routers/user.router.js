import { Router } from 'express';
import { register } from '../controllers/user.controller.js';

const router = Router();

router.route('/register').post(register)
     // Ensure this matches the import

export default router;