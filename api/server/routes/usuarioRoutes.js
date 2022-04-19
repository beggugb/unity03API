import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';
import KeyToken from './keyToken'
const router = Router();

router.get('/data/:pagina/:num/:prop/:orden',UsuarioController.getData)
router.get('/item/:id',UsuarioController.getItem)
router.put('/:id/:tipo',UsuarioController.actualizar)
router.post('/crear/:tipo',UsuarioController.crear)
/*
router.get('/item/copiar/:id',ClienteController.setCopiar)
router.delete('/:id/:tipo',ClienteController.getDelete)
router.put('/:id/:tipo',ClienteController.actualizar)
router.post('/search/lista',ClienteController.search)
router.post('/:tipo', ClienteController.crear);*/

router.post('/login', UsuarioController.login);
router.get('/list/:prop/:orden',KeyToken,UsuarioController.getItems);
export default router;
