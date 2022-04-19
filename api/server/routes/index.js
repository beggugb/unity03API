import KeyToken from './keyToken'
import usuarios from './usuarioRoutes'
import clientes from './clienteRoutes'
import categorias from './categoriaRoutes'
import marcas from './marcaRoutes'
import modelos from './modeloRoutes'
import articulos from './articuloRoutes'
import compras from './compraRoutes'
import mails from './mailRoutes'
import notas from './notaRoutes'
import tpv from './tpvRoutes'
import cajas from './cajaRoutes'
import cajasitems from './cajaItemsRoutes'
import ventas from './ventaRoutes'
import empresas from './empresaRoutes'
import almacenes from './almacenRoutes'
import proveedores from './proveedorRoutes'
import files from './fileRoutes'
import informes from './informeRoutes'
import pucs from './pucRoutes'
import comprobantes from './comprobanteRoutes'
import asientos from './asientoRoutes'
import contabilidad from './contabilidadRoutes'
import proceso from './procesoRoutes'
import tdc from './tdcRoutes'
import tarea from './tareaRoutes'
import ticket from './ticketRoutes'
import ticketitem from './ticketItemRoutes'
import cotizacion from './cotizacionRoutes'
import personas from './personaRoutes'
import salarios from './salarioRoutes'
import horarios from './horarioRoutes'
import contratos from './contratoRoutes'
import cargos from './cargoRoutes'
import prospectos from './prospectoRoutes'
import prospectosc from './prospectoclientesRoutes'
import estudios from './estudioRoutes'
import experiencias from './experienciaRoutes'
import ventaitems from './ventaitemsRoutes'
import pedidos from './pedidoRoutes'
import solicitudes from './solicitudRoutes'
import unidades from './unidadRoutes'

export default(app) => {    
    app.use('/api/usuarios',usuarios);          
    app.use('/api/compras',compras);
    app.use('/api/ventas',ventas);
    app.use('/api/notas',notas);
    app.use('/api/empresas',empresas);
    app.use('/api/procesos',proceso);    
    app.use('/api/unidades',unidades);
    app.use('/api/clientes',clientes);
    app.use('/api/pedidos',pedidos);
    app.use('/api/solicitudes',solicitudes);
    app.use('/api/categorias',KeyToken,categorias);
    app.use('/api/marcas',marcas);
    app.use('/api/modelos',KeyToken,modelos);
    app.use('/api/articulos',articulos);   
    app.use('/api/mails',mails);    
    app.use('/api/tpv',tpv);
    app.use('/api/cajas',KeyToken,cajas);
    app.use('/api/cajasitems',KeyToken,cajasitems);    
    app.use('/api/cotizaciones',cotizacion);    
    app.use('/api/almacenes',KeyToken,almacenes);
    app.use('/api/proveedores',KeyToken,proveedores);
    app.use('/api/files',KeyToken,files);
    app.use('/api/informes',informes);
    app.use('/api/pucs',KeyToken,pucs);
    app.use('/api/comprobantes',KeyToken,comprobantes);
    app.use('/api/asientos',KeyToken,asientos);
    app.use('/api/contabilidad',KeyToken,contabilidad);    
    app.use('/api/tdcs',KeyToken,tdc);
    app.use('/api/tareas',tarea);
    app.use('/api/tickets',ticket);
    app.use('/api/ticketsitem',ticketitem);
    app.use('/api/personas',personas);
    app.use('/api/horarios',horarios);
    app.use('/api/salarios',salarios);
    app.use('/api/contratos',contratos);
    app.use('/api/cargos',cargos);
    app.use('/api/prospectos',prospectos);
    app.use('/api/prospectosc',prospectosc);
    app.use('/api/estudios',estudios);
    app.use('/api/experiencias',experiencias);
    app.use('/api/ventaitems',ventaitems);
}

