import { Router } from 'express';
import TareaController from '../controllers/TareaController';
const router = Router();

router.post('/lista', TareaController.lista);
router.post('/', TareaController.add);
router.get('/:id', TareaController.getItem);
router.put('/:id/:tipo',TareaController.actualizar)
router.post('/search/lista',TareaController.getDelete)
export default router;