import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { EvaluacionPersona, Evaluacion, Persona, Cargo } = database;

class EvaluacionPersonas {

  /** Update Visual Paradingm */
  static getItems(evaluacion){
    return new Promise((resolve,reject) =>{          
      EvaluacionPersona.findAll({
          raw: true,
          nest: true,              
          order: [['id','ASC']],
          where: { evaluacionId: evaluacion},  
          attributes:["id","label","fechaEvaluacion","filename","personaId","observaciones","pExamen","pExperiencia","pPsicologica","pGeneral"],            
          include:[
            { model:Persona,as:"persona",attributes:["id","nombres","paterno","materno","filename"]}                
        ]  
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))
    })
  }

  static setAdd(value){
    return new Promise((resolve,reject) =>{
      EvaluacionPersona.create(value)
        .then((row) => resolve( row ))
        .catch((reason)  => reject({ message: reason.message }))  
    })
  } 
  static setUpdate(value,id){
    return new Promise((resolve,reject) =>{
      EvaluacionPersona.update(value, { where: { id: Number(id) } })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message })) 
    })  
  }


  

    static delete(datoId) {
      console.log(datoId)
        return new Promise((resolve, reject) => {
          EvaluacionPersona.destroy({ where: { id: Number(datoId) } })
            .then((rows) => resolve({ message: 'eliminado' }))
            .catch((reason)  => reject({ message: reason.message }))      
        });
    }
    

    /*static setAdd(data){
        return new Promise((resolve,reject) =>{
           EvaluacionPersona.bulkCreate(data,{individualHooks: true})
            .then((rows) => resolve({ message: 'compras registrada' }))
            .catch((reason)  => reject({ message: reason.message }))      
        })
    }*/

  //Get Items Single
  static getItemsSingle(compra){
    return new Promise((resolve,reject) =>{          
      EvaluacionPersona.findOne({
          raw: true,
          nest: true,              
          order: [['id','ASC']],
          where: { id: compra},
          attributes:["id","evaluacionId","personaId"]
        })
        .then((row) => resolve(row))
        .catch((reason) => reject({ message: reason.message }))
    })
  }
  //Get Items Compuesto


  static getInformeData(gestion){
    return new Promise((resolve,reject) =>{      
        EvaluacionPersona.findAll({
          raw: true,
          nest: true,          
          limit: 10,       
          where: { gestion: gestion },       
          attributes: [[Sequelize.fn('sum',Sequelize.col('cantidad')),'suma'],"articuloId"],
          include:[{ model:Articulo,as:"articulo",attributes:["nombre"]}],               
          group: ['articuloId','nombre']  
        })
        .then((rows) => resolve(rows))
        .catch((reason) => reject({ message: reason.message }))
    })
  }


    
   
    static getList(compra){
        return new Promise((resolve,reject) =>{          
          EvaluacionPersona.findAll({
              raw: true,
              nest: true,              
              order: [['id','ASC']],
              where: { compraId: compra},
              attributes:["id","articuloId","cantidad","valor"],
              include:[{ model:Articulo,as:"articulo",attributes:["categoriaId"]}],              
            })
            .then((rows) => resolve(rows))
            .catch((reason) => reject({ message: reason.message }))
        })
    }
/*
    static getInformeData(){
        return new Promise((resolve,reject) =>{      
            EvaluacionPersona.findAll({
              raw: true,
              nest: true,          
              limit: 10,              
              attributes: [[Sequelize.fn('sum',Sequelize.col('cantidad')),'suma'],"articuloId"],
              include:[{
                model:Articulo,as:"articulo",attributes:["nombre"]               
              }],               
              group: ['articuloId','nombre']  
            })
            .then((rows) => resolve(rows))
            .catch((reason) => reject({ message: reason.message }))
        })
    }
    */
}
export default EvaluacionPersonas;
