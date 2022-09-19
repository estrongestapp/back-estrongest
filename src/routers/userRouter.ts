import { Router } from "express";
import * as controller from '../controllers/userController';

const router = Router();

router.post('/signup', controller.insertUser);
router.post('/signin',controller.login);

export default router;