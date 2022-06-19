import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Evaluacion, Cargo, Departamento } = database;

class EvaluacionService {

    static getList(prop,value){
        return new Promise((resolve,reject) =>{
            Evaluacion.findAll({
              raw: true,
              nest: true,                
              order: [[prop,value]],
              attributes:[[prop,'label'],['id','value']]  
              })
            .then((row) => resolve(row))
            .catch((reason) => reject({ message: reason.message }))
        })
    }

    static getItem(pky){
        return new Promise((resolve,reject) =>{
            Evaluacion.findByPk(pky,{
              raw: true,
              nest: true,
              include:[
                { model:Cargo,as:"cargo",attributes:["id","nombre"]},                
                { model:Departamento,as:"departamento",attributes:["id","nombre"]}
              ] 
            })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message }))
        })
    }    
    static setUpdate(value,id){
        return new Promise((resolve,reject) =>{
            Evaluacion.update(value, { where: { id: Number(id) } })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message })) 
        })
    }
    
    static setAdd(value){
        return new Promise((resolve,reject) =>{
            Evaluacion.create(value)
            .then((row) => resolve( row ))
            .catch((reason)  => reject({ message: reason.message }))  
        })
    } 

    static getData(pag,num,prop,value){
        return new Promise((resolve,reject) =>{
          let page = parseInt(pag);
          let der = num * page - num;
            Evaluacion.findAndCountAll({
              raw: true,
              nest: true,
              offset: der,
              limit: num,
              order: [[prop,value]],
              attributes:["id","fechaInicio","fechaVencimiento","nombre","tipo","estado"],
              include:[
                { model:Cargo,as:"cargo",attributes:["id","nombre"]},                
                { model:Departamento,as:"departamento",attributes:["id","nombre"]}
              ] 
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

    static search(prop,value){
      return new Promise((resolve,reject) =>{            
          let iValue = '%' + value + '%'
          if (value === '--todos--' || value === null || value === '0') { iValue = '%' }            
          Evaluacion.findAndCountAll({
              raw: true,
              nest: true,
              offset: 0,
              limit: 15,
              where: { [prop]: { [Op.iLike]: iValue }},
              order: [[prop,'ASC']],
              attributes:["id","fechaInicio","fechaVencimiento","nombre","tipo","estado"],
              include:[
                { model:Cargo,as:"cargo",attributes:["id","nombre"]},                
                { model:Departamento,as:"departamento",attributes:["id","nombre"]}
              ] 
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

    static delete(datoId) {
        return new Promise((resolve, reject) => {
          Evaluacion.destroy({ where: { id: Number(datoId) } })
            .then((rows) => resolve({ message: 'eliminado' }))
            .catch((reason)  => reject({ message: reason.message }))      
        });
    }

   
   

    

    static getItems(categoriaId){        
        return new Promise((resolve,reject) =>{
            let iCategoria = categoriaId
            let fCategoria = categoriaId
            
            if(categoriaId === 0 || categoriaId === '0' || categoriaId === 'undefined' ) 
            { iCategoria = 0, fCategoria = 5000 }   

            Evaluacion.findAll({
              raw: true,
              nest: true,                
              order: [['nombre','ASC']],
              attributes:[['nombre','label'],['id','value']],
              /*attributes:['categoriaId',['nombre','label'],['id','value']],*/
              /*where :{categoriaId: {[Op.between]: [iCategoria,fCategoria]}},*/
              })
            .then((row) => resolve(row))
            .catch((reason) => reject({ message: reason.message }))
        })
    } 
    
}
export default EvaluacionService;
