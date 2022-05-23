import { Router } from 'express';
import FichaController from '../controllers/FichaController';

const router = Router();
/**Crud */

router.post('/:tipo',FichaController.crear);
/*router.get('/data/:pagina/:num/:prop/:orden',FichaController.getData)
router.get('/item/:id',FichaController.getItem)
router.delete('/:id/:tipo',FichaController.getDelete)
router.put('/:id/:tipo',FichaController.actualizar)
router.post('/search/lista',FichaController.search)
router.get('/list/:name/:value', FichaController.getList); 
/*router.get('/items/:prop/:orden', FichaController.getItems); // items select*/
export default router;
