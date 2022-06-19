import { Router } from 'express';
import EvaluacionController from '../controllers/EvaluacionController';

const router = Router();
/**Crud */
router.get('/data/:pagina/:num/:prop/:orden',EvaluacionController.getData)
router.get('/item/:id',EvaluacionController.getItem)
router.delete('/:id/:tipo',EvaluacionController.getDelete)
router.put('/:id/:tipo',EvaluacionController.actualizar)
router.post('/search/lista',EvaluacionController.search)
router.post('/:tipo', EvaluacionController.crear);

router.get('/list/:name/:value', EvaluacionController.getList); 
/*router.get('/items/:prop/:orden', EvaluacionController.getItems); // items select*/
export default router;
