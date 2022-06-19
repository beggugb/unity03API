import SalarioService from "../services/SalarioService";

class SalarioController {  

    static getList(req, res) {                                     
      SalarioService.getList(req.params.name,req.params.value)
        .then((salarios) => {                
            res.status(200).send({message:"salarios lista", result: salarios });                                               
        })                   
        .catch((reason) => {  
          console.log(reason)            
          res.status(400).send({ message: reason });
        });         
    }

    static getDelete(req, res) {                           
        SalarioService.delete(req.params.id)
            .then((salario) => {                                    
                SalarioService.getData(1,15,'id','DESC')
                  .then((salarios) => {                
                      res.status(200).send({message:"salario eliminada", result: salarios });                                               
                })          
            })                   
            .catch((reason) => {              
          
              res.status(400).send({ message: reason });
            });         
      }

    static search(req, res) {  
        const { prop, value } = req.body                         
        SalarioService.search(prop, value)
            .then((data) => {                          
              res.status(200).send({message:"salarios lista", result: data });            
            })                   
            .catch((reason) => {              
            
              res.status(400).send({ message: reason });
            });         
      }
    
      static actualizar(req, res) {         
        let deto = req.body
        deto.montoDia    = parseFloat(deto.monto / 25).toFixed(2)        
        deto.montoHora   = parseFloat(deto.montoDia / 8).toFixed(2)
        deto.montoMinutos = parseFloat(deto.montoHora / 60).toFixed(2)  

        SalarioService.setUpdate(deto,req.params.id)
            .then((xsalario) => {                
                SalarioService.getData(1,15,'id','asc')
                .then((salarios) => {                
                    res.status(200).send({message:"salarios lista", result: salarios });                                               
                })            
            })                   
            .catch((reason) => {              
            
              res.status(400).send({ message: reason });
            });         
      }

    static getItem(req, res) {                           
        SalarioService.getItem(req.params.id)
            .then((salario) => {                
                res.status(200).send({message:"salario item", result: salario });                                               
            })                   
            .catch((reason) => {              
             
              res.status(400).send({ message: reason });
            });         
      }
      static getData(req, res) {                           
        SalarioService.getData(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
            .then((salarios) => {                
                res.status(200).send({message:"salarios lista", result: salarios });                                               
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
      }


/*
    static getItems(req, res) {                   
        SalarioService.getItems()
            .then((salarios) => {                
                res.status(200).send({message:"salarios lista", result: salarios });                                               
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    } */
    


    static crear(req, res) {           
      let deto = req.body
        deto.montoDia    = parseFloat(deto.monto / 25).toFixed(2)        
        deto.montoHora   = parseFloat(deto.montoDia / 8).toFixed(2)
        deto.montoMinutos = parseFloat(deto.montoHora / 60).toFixed(2)   
      
        SalarioService.setAdd(deto)
            .then((salario)=>{
              SalarioService.getData(1,15,'id','asc')
              .then((salarios) => {                
                  res.status(200).send({message:"salarios lista", result: salarios });                                               
              })                                  
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    } 




    
    
}

export default SalarioController;
