import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Categoria } = database;

class CategoriaService {

    static getData(pag,num,prop,value){
        return new Promise((resolve,reject) =>{
          let page = parseInt(pag);
          let der = num * page - num;
            Categoria.findAndCountAll({
              raw: true,
              nest: true,
              offset: der,
              limit: num,
              order: [[prop,value]],
              where: { id: { [Op.gt]: 1 }}, 
            })
            .then((rows) => resolve({
              paginas: Math.ceil(rows.count / num),
              pagina: page,
              total: rows.count,
              data: rows.rows
            }))
            .catch((reason) => reject({ message: reason.message }))
        })
    }

    static getItem(pky){
        return new Promise((resolve,reject) =>{
            Categoria.findByPk(pky,{
              raw: true,
              nest: true
            })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message }))
        })
    }    
    static setUpdate(value,id){
        return new Promise((resolve,reject) =>{
            Categoria.update(value, { where: { id: Number(id) } })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message })) 
        })
    }
    
    static setAdd(value){
        return new Promise((resolve,reject) =>{
            Categoria.create(value)
            .then((row) => resolve( row ))
            .catch((reason)  => reject({ message: reason.message }))  
        })
    } 

   

    static delete(datoId) {
        return new Promise((resolve, reject) => {
          Categoria.destroy({ where: { id: Number(datoId) } })
            .then((rows) => resolve({ message: 'eliminado' }))
            .catch((reason)  => reject({ message: reason.message }))      
        });
    }

   
    static getList(prop,value){
        return new Promise((resolve,reject) =>{
            Categoria.findAll({
              raw: true,
              nest: true,                
              order: [[prop,value]],
              attributes:[[prop,'label'],['id','value']]  
              })
            .then((row) => resolve(row))
            .catch((reason) => reject({ message: reason.message }))
        })
    }

    static search(prop,value){
      return new Promise((resolve,reject) =>{               
          let iValue = '%' + value + '%'               
          if (value === '--todos--' || value === null || value === '0' || value === undefined) { iValue = '%' }            
          Categoria.findAndCountAll({
              raw: true,
              nest: true,
              offset: 0,
              limit: 15,
              where: { [prop]: { [Op.iLike]: iValue }},
              order: [[prop,'ASC']],
              where: { id: { [Op.gt]: 1 }}, 
          })		
          .then((rows) => resolve({
              paginas: Math.ceil(rows.count / 15),
              pagina: 1,
              total: rows.count,
              data: rows.rows
          } 
          ))
      .catch((reason)  => reject({ message: reason.message })) 
       })
     }

     static getItems(){
        return new Promise((resolve,reject) =>{
            Categoria.findAll({
              raw: true,
              nest: true,                
              order: [['nombre','ASC']],
              attributes:[['nombre','label'],['id','value']]  
              })
            .then((row) => resolve(row))
            .catch((reason) => reject({ message: reason.message }))
        })
    } 


    
}
export default CategoriaService;
