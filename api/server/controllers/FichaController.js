import FichaService from "../services/FichaService";

class FichaController {  
    static crear(req, res) {           
        FichaService.setAdd(req.body)
            .then((ficha)=>{             
                  res.status(200).send({message:"fichas lista", result: ficha });                                                            
            })                   
            .catch((reason) => {              
              res.status(400).send({ message: reason });
            });         
    } 

}

export default FichaController;
