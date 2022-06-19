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
import mobil from './mobilRoutes'
import movimientos from './movimientoRoutes'
import fichas from './fichaRoutes'
import evaluacion from './evaluacionRoutes'
import evaluacionp from './evaluacionpRoutes'
import departamento from './departamentoRoutes'
import registro from './registroRoutes'

export default(app) => {    
    app.use('/api/usuarios',usuarios);   
    app.use('/api/evaluaciones',evaluacion);       
    app.use('/api/compras',KeyToken,compras);
    app.use('/api/evaluacionesp',evaluacionp);
    app.use('/api/departamentos',departamento);
    app.use('/api/registros',registro);
    app.use('/api/fichas',fichas);
    app.use('/api/ventas',KeyToken,ventas);
    app.use('/api/movimientos',KeyToken,movimientos);
    app.use('/api/notas',KeyToken,notas);
    app.use('/api/empresas',empresas);
    app.use('/api/procesos',KeyToken,proceso);    
    app.use('/api/unidades',KeyToken,unidades);
    app.use('/api/clientes',KeyToken,clientes);
    app.use('/api/pedidos',KeyToken,pedidos);
    app.use('/api/mobil',mobil);
    app.use('/api/solicitudes',KeyToken,solicitudes);
    app.use('/api/categorias',KeyToken,categorias);
    app.use('/api/marcas',KeyToken,marcas);
    app.use('/api/modelos',KeyToken,modelos);
    app.use('/api/articulos',articulos);   
    app.use('/api/mails',KeyToken,mails);    
    app.use('/api/tpv',tpv);
    app.use('/api/cajas',cajas);
    app.use('/api/cajasitems',KeyToken,cajasitems);    
    app.use('/api/cotizaciones',cotizacion);    
    app.use('/api/almacenes',almacenes);
    app.use('/api/proveedores',proveedores);
    app.use('/api/files',KeyToken,files);
    app.use('/api/informes',informes);
    app.use('/api/pucs',KeyToken,pucs);
    app.use('/api/comprobantes',KeyToken,comprobantes);
    app.use('/api/asientos',KeyToken,asientos);
    app.use('/api/contabilidad',KeyToken,contabilidad);    
    app.use('/api/tdcs',KeyToken,tdc);
    app.use('/api/tareas',KeyToken,tarea);
    app.use('/api/tickets',ticket);
    app.use('/api/ticketsitem',KeyToken,ticketitem);
    app.use('/api/personas',personas);
    app.use('/api/horarios',horarios);
    app.use('/api/salarios',salarios);
    app.use('/api/contratos',KeyToken,contratos);
    app.use('/api/cargos',cargos);
    app.use('/api/prospectos',KeyToken,prospectos);
    app.use('/api/prospectosc',KeyToken,prospectosc);
    app.use('/api/estudios',KeyToken,estudios);
    app.use('/api/experiencias',KeyToken,experiencias);
    app.use('/api/ventaitems',KeyToken,ventaitems);
}

