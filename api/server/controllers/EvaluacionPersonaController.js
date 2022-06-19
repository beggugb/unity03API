import EvaluacionesService from "../services/EvaluacionesService";
import EvaluacionPersonasService from "../services/EvaluacionPersonasService"

class EvaluacionPersonaController {  

  /** Update Visual Paradingm */
  static crear(req, res) {             
    const { evaluacionId } = req.body  
    EvaluacionPersonasService.setAdd(req.body)
          .then((xitem)=>{            
            EvaluacionPersonasService.getItems(evaluacionId)
            .then((xdata) => {  
              let resData = xdata.map((item,index)=>{
                let iok = {
                "id"              : item.id,   
                "fechaEvaluacion" : item.fechaEvaluacion,
                "label"           : item.label,
                "filename"        : item.filename,
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
            res.status(200).send({message:"evaluaciones lista", result: resData });
          }) 
          .catch((reason) => {   
            console.log(reason)           
            res.status(400).send({ message: reason });
          })                                 
        })                   
        .catch((reason) => {   
          console.log(reason)           
          res.status(400).send({ message: reason });
        });         
  }

  /** Update Visual Paradingm */
  static getDelete(req, res) {                 
    EvaluacionPersonasService.getItemsSingle(req.params.id)
      .then((xitem)=>{          
          EvaluacionPersonasService.delete(req.params.id)
          .then((xpersona)=>{
            EvaluacionPersonasService.getItems(xitem.evaluacionId)
            .then((xdata) => {                
              let resData = xdata.map((item,index)=>{
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
            res.status(200).send({message:"evaluaciones lista", result: resData });                                            
            })
            .catch((reason) => {    
              console.log(reason)          
              res.status(400).send({ message: reason });
          });
      })
      .catch((reason) => {    
        console.log(reason)          
        res.status(400).send({ message: reason });
    });
    })
      .catch((reason) => {    
          console.log(reason)          
          res.status(400).send({ message: reason });
      });   
        
  } 

    static actualizar(req, res) {  
      const { evaluacionId } = req.body                               
      EvaluacionPersonasService.setUpdate(req.body,req.params.id)
      .then((xitem)=>{              
          EvaluacionPersonasService.getItems(evaluacionId)
          .then((xdata) => {  
            let resData = xdata.map((item,index)=>{
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
          res.status(200).send({message:"evaluaciones lista", result: resData });
        })        
      })         
    }

     

       
          /*EvaluacionesService.delete(req.params.id)
              .then((xitem)=>{
                EvaluacionPersonasService.getItems(evaluacionId)
                .then((marcas) => {                
                    res.status(200).send({message:"evaluaciones lista", result: marcas });                                               
                })                                  
              })                   
              .catch((reason) => {              
                res.status(400).send({ message: reason });
              });   
              
         /*     
      }

     /*

  static getList(req, res) {                                     
    EvaluacionesService.getItems(req.params.name,req.params.value)
        .then((marcas) => {                
            res.status(200).send({message:"marcas lista", result: marcas });                                               
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

  static search(req, res) {  
        const { prop, value } = req.body                         
        EvaluacionesService.search(prop, value)
            .then((data) => {                          
              res.status(200).send({message:"marcas lista", result: data });            
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
    
   static actualizar(req, res) {                           
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
         
      }

    static getItem(req, res) {                           
        EvaluacionesService.getItem(req.params.id)
            .then((marca) => {                
                res.status(200).send({message:"marca item", result: marca });                                               
            })                   
            .catch((reason) => {              
             
              res.status(400).send({ message: reason });
            });         
      }
      static getData(req, res) {                           
        EvaluacionesService.getData(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
            .then((marcas) => {                
                res.status(200).send({message:"evaluaciones lista", result: marcas });                                               
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
      }



    static getItems(req, res) {                   
        EvaluacionesService.getItems()
            .then((marcas) => {                
                res.status(200).send({message:"marcas lista", result: marcas });                                               
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    } 
    


    static crear(req, res) {           
        EvaluacionesService.setAdd(req.body)
            .then((marca)=>{
              EvaluacionesService.getData(1,15,'id','asc')
              .then((marcas) => {                
                  res.status(200).send({message:"evaluaciones lista", result: marcas });                                               
              })                                  
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    } */

}

export default EvaluacionPersonaController;
