import TicketService from "../services/TicketService";
import TicketItemService from "../services/TicketItemService";

class TicketItemController { 

     /** Update Visual Paradingm */
    static getDelete(req, res) {                           
      TicketItemService.getItem(req.params.id)
        .then((itt)=>{
          TicketItemService.delete(req.params.id)
            .then((xitem)=>{
              TicketItemService.getData(1,15,itt)
              .then((tickets) => {                
                  res.status(200).send({message:"tickets lista", result: tickets });                                               
              })         
            })    
        })          
      
    }
     /** Update Visual Paradingm */
    static getData(req, res) {                           
        TicketItemService.getData(req.params.pagina,req.params.num,req.params.prop)
            .then((tickets) => {                
                res.status(200).send({message:"tickets lista", result: tickets });                                               
            })                   
            .catch((reason) => {     
              console.log(reason)         
              res.status(400).send({ message: reason });
            });         
    }
     /** Update Visual Paradingm */
    static crear(req, res) {        
        const { ticketId } = req.body   
        TicketItemService.setAdd(req.body)
            .then((ticket)=>{
                TicketItemService.getData(1,15,ticketId)
              .then((tickets) => {                
                  res.status(200).send({message:"tickets lista", result: tickets });                                               
              })                                  
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    }     
    
}

export default TicketItemController;
