import { Router } from "express";
import * as controller from '../controllers/userController';

const router = Router();

router.post('/', controller.insertUser);

export default router;