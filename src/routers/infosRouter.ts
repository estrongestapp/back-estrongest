import { Router } from "express";
import * as controller from '../controllers/infosController';

const router = Router();

router.post('/', controller.insertInfos);

export default router;