import { Router } from "express";
import { body } from "express-validator";
import * as controllers from '../controllers/index';

const router = Router();

router.get('/', controllers.primeira);

router.post('/secundaria', body('tag').notEmpty().isLength({max:8,min:8}), controllers.secundaria);

export default router;