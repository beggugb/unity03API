import ClienteService from "../services/ClienteService";
import CuentaCorrienteService from "../services/CuentaCorrienteService"
import VentaService from "../services/VentaService"

class ClienteController {
  
  /** Update Visual Paradingm */
  static getData(req, res) {                           
    ClienteService.getData(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
      .then((clientes) => {                
        res.status(200).send({message:"clientes lista", result: clientes });                                               
      })                   
      .catch((reason) => {              
        res.status(400).send({ message: reason });
      });         
  }
  
  /** Update Visual Paradingm */
  static getItem(req, res) {                           
    Promise.all([
      ClienteService.getItem(req.params.id),
      VentaService.dataCliente(1,15,req.params.id)]) 
      .then(([cliente,ventas]) => {                
            res.status(200).send({message:"cliente item", result: {cliente,ventas} });                                               
      })                   
      .catch((reason) => {                        
        res.status(400).send({ message: reason });
      });         
  }
  
  /** Update Visual Paradingm */
  static setCopiar(req, res) {                           
    ClienteService.getItem(req.params.id)
        .then((cliente) => {                
          let newItem = cliente
          newItem.id = null
          newItem.createdAt = null
          newItem.updatedAt = null
          newItem.codigo = '(copia)'+cliente.codigo
          newItem.nombres = '(copia)'+cliente.nombres
          ClienteService.setAdd(newItem)
          .then((itm)=>{
              ClienteService.getData(1,15,'nombres','DESC')
              .then((clientes) => {                
                  res.status(200).send({message:"cliente copiado", result: clientes });                                               
              })
          })
        })                   
        .catch((reason) => {                        
          res.status(400).send({ message: reason });
        });         
  }

  /** Update Visual Paradingm */
  static getDelete(req, res) {                           
    ClienteService.delete(req.params.id)
      .then((cliente) => {                                    
        ClienteService.getData(1,15,'nombres','DESC')
          .then((clientes) => {                
              res.status(200).send({message:"cliente eliminado", result: clientes });                                               
          })          
        })                   
        .catch((reason) => {                        
          res.status(400).send({ message: reason });
        });         
  }

  /** Update Visual Paradingm */
  static actualizar(req, res) {                           
    ClienteService.setUpdate(req.body,req.params.id)
        .then((xcliente) => {                
          ClienteService.getItem(req.params.id)
            .then((cliente)=>{
              res.status(200).send({message:"cliente actualizado", result: cliente });
            })            
        })                   
        .catch((reason) => {                        
          res.status(400).send({ message: reason });
        });         
  }

  /** Update Visual Paradingm */
  static crear(req, res) {           
    const { nit } = req.body        
      ClienteService.verificar(nit)
        .then((row) => {                
            if(row)
            {
              res.status(200).send({message:"el cliente ya existe", result: row });                          
            }else{
              ClienteService.setAdd(req.body)
                .then((cliente)=>{                    
                  res.status(200).send({message:"cliente registrado", result: cliente });                                           
                })                      
                .catch((reason) => {              
                    res.status(400).send({ message: reason });
                });
            }                    
        })                   
        .catch((reason) => {              
          res.status(400).send({ message: reason });
        });         
  }

  /** Update Visual Paradingm */
  static search(req, res) {  
    const { prop, value } = req.body                         
    ClienteService.search(prop, value)
      .then((data) => {                          
        res.status(200).send({message:"clientes lista", result: data });            
      })                   
      .catch((reason) => {                        
        res.status(400).send({ message: reason });
      });         
  } 
  
}
export default ClienteController;
