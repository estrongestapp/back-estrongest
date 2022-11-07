import { Router } from "express";
import * as controller from '../controllers/infosController';

const router = Router();

router.post('/', controller.insertInfos);
router.post('/all', controller.getAllInfos);

export default router;