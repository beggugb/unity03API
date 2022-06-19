import TicketService from "../services/TicketService";
import TicketItemService from "../services/TicketItemService";

class TicketController { 

    /** Update Visual Paradingm */
    static crear(req, res) {          
      let iok = req.body
      let d            = new Date()      
      let fechaGestion = d.getFullYear() 
      let fregistro    = (new Date(d + 'UTC')).toISOString().replace(/-/g, '-').split('T')[0] 
      iok.gestion       = fechaGestion
      iok.fechaRegistro = fregistro
      iok.fechaCierre   = fregistro      
        TicketService.setAdd(iok)
          .then((xitem)=>{
            let newIok = {
              id: xitem,
              codigo: 'TK - '+xitem 
            }
            TicketService.setUpdate(newIok,xitem)
              .then((xitt)=>{
                TicketService.getItem(xitem)
                .then((ticket) => {                
                    res.status(200).send({message:"tickets lista", result: ticket });                                               
                })
              })                                               
            })                   
            .catch((reason) => {       
              console.log(reason)       
              res.status(400).send({ message: reason });
            });         
    }

    /** Update Visual Paradingm */
    static getLista(req, res) {                           
      const { inicio, fin } = req.body
      console.log(inicio)
      console.log(fin)
      TicketService.getLista(inicio,fin)
          .then((data) => {              
            let resData = data.map((item,index)=>{
              let iok = {
              "id"              : item.id,   
              "fechaRegistro"   : item.fechaRegistro,
              "clients"         : item.clients,
              "detalle"         : item.detalle,
              "estado"          : item.estado,
              "title"           : item.clients,
              "start"           : item.fechaRegistro,
              "end"             : item.fechaRegistro,
              "backgroundColor" : item.estado === 'cerrado' ? '#1cb84a': '#ee0808',
              "selectable"      : false,
              "usuarioId"       : item.usuarioId
              }
          return iok;
          })          
          res.status(200).send({message:"tickets lista", result: resData });                             
  
        })                   
          .catch((reason) => {     
            console.log(reason)         
            res.status(400).send({ message: reason });
          });         
    }
  
  /** Update Visual Paradingm */
  static getData(req, res) {                           
    TicketService.getData(req.params.pagina,req.params.num,req.params.prop,req.params.orden)
        .then((data) => {                      
        res.status(200).send({message:"tickets lista", result: data }); 
      })                   
        .catch((reason) => {     
          console.log(reason)         
          res.status(400).send({ message: reason });
        });         
  }


  static getItem(req, res) {                           
    Promise.all([TicketService.getItem(req.params.id),TicketItemService.getData(1,15,req.params.id)])
        .then(([ticket,items]) => {                
            res.status(200).send({message:"ticket item", result: {ticket,items} });                                               
        })                   
        .catch((reason) => {
          res.status(400).send({ message: reason });
        });         
  }

  static search(req, res) {  
    const { prop, value } = req.body                         
    TicketService.search(prop, value)
        .then((data) => {                          
          res.status(200).send({message:"tickets lista", result: data });            
        })                   
        .catch((reason) => {                      
          res.status(400).send({ message: reason });
        });         
  }

  

    static getDelete(req, res) {                           
        TicketService.delete(req.params.id)
            .then((ticket) => {                                    
                TicketService.getData(1,15,'id','DESC')
                  .then((tickets) => {                
                      res.status(200).send({message:"ticket eliminada", result: tickets });                                               
                })          
            })                   
            .catch((reason) => {              
          
              res.status(400).send({ message: reason });
            });         
      }

    
    
     

   
     



    static getItems(req, res) {                   
        TicketService.getItems(req.params.prop,req.params.orden)
            .then((tickets) => {                
                res.status(200).send({message:"tickets lista", result: tickets });                                               
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    } 
    


    

    static actualizar(req, res) {                           
      TicketService.setUpdate(req.body,req.params.id)
          .then((xticket) => {                      
              TicketService.getItem(req.params.id)
              .then((tickets) => {                
                  res.status(200).send({message:"tickets lista", result: tickets });                                               
              })            
          })                   
          .catch((reason) => {              
          
            res.status(400).send({ message: reason });
          });         
    }




    static getList(req, res) {                                     
        TicketService.getItems(req.params.name,req.params.value)
            .then((tickets) => {                
                res.status(200).send({message:"tickets lista", result: tickets });                                               
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    }  
    
    
}

export default TicketController;
