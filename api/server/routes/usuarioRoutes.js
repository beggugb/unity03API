import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import KeyToken from './keyToken'
const router = Router();

router.post('/login', UsuarioController.login);

router.get('/data/:pagina/:num/:prop/:orden',KeyToken,UsuarioController.getData)
router.get('/item/:id',KeyToken,UsuarioController.getItem)
router.put('/:id/:tipo',KeyToken,UsuarioController.actualizar)
router.post('/crear/:tipo',KeyToken,UsuarioController.crear)
router.get('/list/:prop/:orden',KeyToken,UsuarioController.getItems);
export default router;
