import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Movimiento, Compra } = database;

class MovimientoService {
    
    static setAdd(value){
        return new Promise((resolve,reject) =>{
            Movimiento.create(value)
            .then((row) => resolve( row.id ))
            .catch((reason)  => reject({ message: reason.message }))  
        })
    }  
    static getListaDetalle(gestion,tipo){
      return new Promise((resolve,reject) =>{      
        Movimiento.findAll({
            raw:true,
            nest:true,                      
            where: {[Op.and]: [
              { gestion: gestion },              
              { tipo:  tipo }          
             ]},
            attributes: [[Sequelize.fn('count',Sequelize.col('id')),'total'],'mes','tipo'],
            group:['mes','tipo']
          })
          .then((rows) => resolve(rows))
          .catch((reason)  => reject({ message: reason.message }))  
      })
  }
    static getDetalle(desde,hasta,tipo){
        return new Promise((resolve,reject) =>{      
          let iValue  = tipo + '%'   

          if(tipo === '--todos--' || tipo === null || tipo === '0' || tipo === 0) { iValue = '%' } 
          Movimiento.findAndCountAll({
              raw:true,
              nest:true,          
              where: {[Op.and]: [
                { fecha: { [Op.between]: [desde, hasta]}},
                /*{ tipo: tipo},*/
                {tipo: { [Op.iLike]: iValue}},          
               ]}, 
               attributes:["id","origen","destino","nroItems","fecha","compraId","ventaId","almacenId"],
               include:[
                {model:Compra,as:"compra",attributes:["id","observaciones","totalGeneral"]}]
            })
            .then((rows) => resolve({                    
              total: rows.count,
              data: rows.rows          
            }))
            .catch((reason)  => reject({ message: reason.message }))  
        })
    }    
    
}
export default MovimientoService;
