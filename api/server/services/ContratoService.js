import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Contrato, Persona, Horario, Salario, Cargo } = database;

class ContratoService {

  static getTotal(gestion){
    return new Promise((resolve,reject)=>{
      console.log(gestion)
      Contrato.findAll({
        raw:true,
        nest:true,
        where:{gestion: gestion},
        attributes:['estado',
        [Sequelize.fn('count',Sequelize.col('id')),'total']],
        group:['estado']        
      })
      .then((row) => resolve(row))
      .catch((reason) => reject({ message: reason.message }))
    })
  }

  static verificarLista(){
    return new Promise((resolve,reject) =>{
      let d     = new Date()
      let fecha = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
      
        Contrato.findAll({
          raw: true,
          nest: true,
          attributes:["id","fechaInicio","fechaFin","cargoId","personaId"],
          where: {[Op.and]: [
            { fechaFin: { [Op.gte]: fecha}},            
            { estado : true}
           ]},
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
  }

  static verificar(personaId){
    return new Promise((resolve,reject) =>{
      let d     = new Date()
      let fecha = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        Contrato.findOne({
          raw: true,
          nest: true,
          attributes:["id","fechaInicio","fechaFin"],
          where: {[Op.and]: [
            { fechaFin: { [Op.lte]: fecha}},            
            { personaId: personaId},
           ]},
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
  }

  static verificarVigencia(personaId){
    return new Promise((resolve,reject) =>{
      let d     = new Date()
      let fecha = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
        Contrato.findOne({
          raw: true,
          nest: true,
          include:[
            {model:Salario,as:"salario",attributes:["id","nombre","monto","montoMinutos"]},            
            {model:Cargo,as:"cargo",attributes:["id","nombre","departamentoId"]}
          ], 
          where: {[Op.and]: [
            { fechaFin: { [Op.gte]: fecha}},            
            { personaId: personaId},
           ]},
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
 }
 static verificar(personaId){
  return new Promise((resolve,reject) =>{
    let d     = new Date()
    let fecha = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
      Contrato.findOne({
        raw: true,
        nest: true,
        attributes:["id","fechaInicio","fechaFin"],
        where: {[Op.and]: [
          { fechaFin: { [Op.lte]: fecha}},            
          { personaId: personaId},
         ]},
      })
      .then((row)=> resolve( row ))
      .catch((reason) => reject({ message: reason.message }))
  })
}
 static setAdd(value){
  return new Promise((resolve,reject) =>{
      Contrato.create(value)
      .then((row) => resolve( row.id ))
      .catch((reason)  => reject({ message: reason.message }))  
  })
 }
 static getItem(pky){
        return new Promise((resolve,reject) =>{
            Contrato.findByPk(pky,{
              raw: true,
              nest: true,
              include:[
                {model:Salario,as:"salario",attributes:["id","nombre","monto"]},
                {model:Horario,as:"horario",attributes:["id","nombre"]},
                {model:Cargo,as:"cargo",attributes:["id","nombre"]},
                {model:Persona,as:"persona",attributes:["id","nombres","ci","paterno","materno","filename"]},
              ] 
            })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message }))
        })
    }    
    static setUpdate(value,id){
        return new Promise((resolve,reject) =>{
            Contrato.update(value, { where: { id: Number(id) } })
            .then((row)=> resolve( row ))
            .catch((reason) => reject({ message: reason.message })) 
        })
    }
    
    

    static getData(pag,num,prop,value){
        return new Promise((resolve,reject) =>{
          let page = parseInt(pag);
          let der = num * page - num;
            Contrato.findAndCountAll({
              raw: true,
              nest: true,
              offset: der,
              limit: num,
              order: [[prop,value]],
              attributes:["id","plazo","fechaInicio","fechaFin","contratado"],
              include:[                
                {model:Cargo,as:"cargo",attributes:["id","nombre"]},
                {model:Persona,as:"persona",attributes:["id","nombres","ci"]},
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

    static delete(datoId) {
        return new Promise((resolve, reject) => {
          Contrato.destroy({ where: { id: Number(datoId) } })
            .then((rows) => resolve({ message: 'eliminado' }))
            .catch((reason)  => reject({ message: reason.message }))      
        });
    }

   
    static getList(prop,value){
        return new Promise((resolve,reject) =>{
            Contrato.findAll({
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
          if (value === '--todos--' || value === null || value === '0') { iValue = '%' }            
          Contrato.findAndCountAll({
              raw: true,
              nest: true,
              offset: 0,
              limit: 12,              
              order: [['id','ASC']],
              include:[                
                {model:Cargo,as:"cargo",attributes:["id","nombre"]},
                {model:Persona,as:"persona",
                  attributes:["id","nombres","ci"],
                  where: { [prop]: { [Op.iLike]: iValue }},
                },
              ]
          })		
          .then((rows) => resolve({
              paginas: Math.ceil(rows.count / 12),
              pagina: 1,
              total: rows.count,
              data: rows.rows
          } 
          ))
      .catch((reason)  => reject({ message: reason.message })) 
       })
     }

    static getItems(categoriaId){        
        return new Promise((resolve,reject) =>{
            let iCategoria = categoriaId
            let fCategoria = categoriaId
            
            if(categoriaId === 0 || categoriaId === '0' || categoriaId === 'undefined' ) 
            { iCategoria = 0, fCategoria = 5000 }   

            Contrato.findAll({
              raw: true,
              nest: true,                
              order: [['nombre','ASC']],
              attributes:['categoriaId',['nombre','label'],['id','value']],
              where :{categoriaId: {[Op.between]: [iCategoria,fCategoria]}},
              })
            .then((row) => resolve(row))
            .catch((reason) => reject({ message: reason.message }))
        })
    } 
    
}
export default ContratoService;
