import { Router } from 'express';
import TicketController from '../controllers/TicketController';

const router = Router();
/**Crud */
router.get('/data/:pagina/:num/:prop/:orden',TicketController.getData)
router.get('/item/:id',TicketController.getItem)
router.delete('/:id/:tipo',TicketController.getDelete)
router.put('/:id/:tipo',TicketController.actualizar)
router.post('/search/lista',TicketController.search)
router.post('/:tipo', TicketController.crear);

router.post('/data/lista/rango/', TicketController.getLista); 
router.get('/items/:prop/:orden', TicketController.getItems);
export default router;
