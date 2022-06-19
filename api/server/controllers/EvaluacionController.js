import EvaluacionesService from "../services/EvaluacionesService";
import EvaluacionPersonasService from "../services/EvaluacionPersonasService"

class MarcaController {  

  /** Update Visual Paradingm */
  static crear(req, res) {           
    EvaluacionesService.setAdd(req.body)
        .then((evaluacion)=>{                    
          res.status(200).send({message:"evaluaciones save", result: evaluacion });                                               
                                    
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });         
  } 

  /** Update Visual Paradingm */
  static search(req, res) {  
    const { prop, value } = req.body                         
        EvaluacionesService.search(prop, value)
        .then((data) => {               
          let resData = data.data.map((item,index)=>{
              let iok = {
              "id"               : item.id,   
              "fechaInicio"      : item.fechaInicio,
              "fechaVencimiento" : item.fechaVencimiento,
              "nombre"           : item.nombre,
              "tipo"             : item.tipo,
              "estado"           : item.estado,
              "cargo"            : item.cargo.nombre,
              "departamento"     : item.departamento.nombre,
              "pExamen"          : item.pExamen,
              "pExperiencia"     : item.pExperiencia,
              "pPsicologica"     : item.pPsicologica,
              "pGeneral"         : item.pGeneral
              }
          return iok;
          })  
          res.status(200).send({message:"evaluaciones lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} }); 
        })                  
        .catch((reason) => {    
          res.status(400).send({ message: reason });
        });         
  }

  /** Update Visual Paradingm */
  static getData(req, res) {                           
    EvaluacionesService.getData(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
      .then((data) => {               
        let resData = data.data.map((item,index)=>{
            let iok = {
            "id"               : item.id,   
            "fechaInicio"      : item.fechaInicio,
            "fechaVencimiento" : item.fechaVencimiento,
            "nombre"           : item.nombre,
            "tipo"             : item.tipo,
            "estado"           : item.estado,
            "cargo"            : item.cargo.nombre,
            "departamento"     : item.departamento.nombre 
            }
        return iok;
        })  
        res.status(200).send({message:"evaluaciones lista", result: {data: resData, total: data.total, pagina: data.pagina,paginas:data.paginas} });              
      })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
      });         
  }

  /** Update Visual Paradingm */
  static getItem(req, res) {                           
    Promise.all([
      EvaluacionesService.getItem(req.params.id),
      EvaluacionPersonasService.getItems(req.params.id)
    ])    
      .then(([evaluacion,personas]) => {      
        let resData = personas.map((item,index)=>{
          let iok = {
              "id"              : item.id,   
              "fechaEvaluacion" : item.fechaEvaluacion,
              "label"           : item.label,
              "filename"        : item.filename,
              "foto"            : item.persona.filename,
              "personaId"       : item.personaId,
              "persona"         : item.persona.nombres +', '+ item.persona.paterno +' '+ item.persona.materno,
              "observaciones"   : item.observaciones,
              "pExamen"         : item.pExamen,
              "pExperiencia"    : item.pExperiencia,
              "pPsicologica"    : item.pPsicologica,
              "pGeneral"        : item.pGeneral
          }
      return iok;
      })           
      res.status(200).send({message:"marca item", result: { evaluacion : evaluacion, personas: resData }}); 
      })                   
      .catch((reason) => {       
        console.log(reason)
        res.status(400).send({ message: reason });
      });         
  }

  static getList(req, res) {                                     
    EvaluacionesService.getItems(req.params.name,req.params.value)
        .then((marcas) => {                
            res.status(200).send({message:"evalucaciones lista", result: marcas });                                               
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });         
  } 

  static getDelete(req, res) {                           
        EvaluacionesService.delete(req.params.id)
            .then((marca) => {                                    
                EvaluacionesService.getData(1,15,'id','DESC')
                  .then((marcas) => {                
                      res.status(200).send({message:"marca eliminada", result: marcas });                                               
                })          
            })                   
            .catch((reason) => {              
          
              res.status(400).send({ message: reason });
            });         
  }

  
      
      static actualizar(req, res) {                                 
            EvaluacionesService.setUpdate(req.body,req.params.id)
            .then((xitem)=>{              
              EvaluacionesService.getItem(req.params.id)
              .then((item )=>{
                res.status(200).send({message:"evaluaciones up", result: item});
              })                            
          })         
      }
    
    /*static actualizar(req, res) {                           
      const { item, items } = req.body 


        EvaluacionPersonasService.delete(item.id)
        .then((yitems)=>{
          Promise.all([
            EvaluacionPersonasService.setAdd(items),
            EvaluacionesService.setUpdate(item,item.id)])
            .then((uevaluacion,uitems)=>{
              Promise.all([
              EvaluacionesService.getItem(item.id),
              EvaluacionPersonasService.getItems(item.id)])
              .then(([item,xitems])=>{
                let items = xitems.map((it,index)=>{
                  let eok = {
                      "personaId" : it.persona.id,
                      "nombres"   : it.persona.paterno + ' ' +it.persona.materno + ', ' + it.persona.nombres,
                      "filename"  : it.filename,
                      "pExamen"   : it.pExamen,
                      "pExperiencia" : it.pExperiencia,
                      "pPsicologica"   : it.pPsicologica,
                      "pGeneral"   : it.pGeneral,
                      "fecha"      : it.fechaEvaluacion                      
                  }
                  return eok;
              })
              res.status(200).send({message:"evaluaciones lista", result: {item, items }});
              })
            })
        })
         
      }*/

   
     



    static getItems(req, res) {                   
        EvaluacionesService.getItems()
            .then((marcas) => {                
                res.status(200).send({message:"evalucaciones lista", result: marcas });                                               
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    } 
    


  

}

export default MarcaController;
