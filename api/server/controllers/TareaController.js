import TareaService from "../services/TareaService";

class TareaController {
  /** Update Visual Paradingm */
  static lista(req, res) {    
    const { usuarioId, start, end } = req.body;   
    TareaService.getAll(usuarioId, start, end)
      .then((data) => {        
        res.status(200).send({ result: data });
      })
      .catch((reason) => {        
        res.status(400).send({ message: reason });
      });    
  }
  
  /** Update Visual Paradingm */
  static add(req, res) {    
    const { usuarioId , inicio, fin } = req.body      
    TareaService.add(req.body)
      .then((tarea) => {        
        TareaService.getAll(usuarioId, inicio, fin)
          .then((data) => {
          res.status(200).send({ message:"tarea registrada", result: data });
         })  
      })
      .catch((reason) => {
        res.status(400).send({ message: reason });
      });          
  }

  /** Update Visual Paradingm */
  static getDelete(req, res) {    
    const { tareaId, usuarioId , inicio, fin } = req.body    
    console.log(inicio)      
    console.log(fin)      
    TareaService.delete(tareaId)
      .then((tarea) => {        
        TareaService.getAll(usuarioId, inicio, fin)
          .then((data) => {
          res.status(200).send({ message:"tarea registrada", result: data });
         })  
      })
      .catch((reason) => {        
        res.status(400).send({ message: reason });
      });          
  }

  /** Update Visual Paradingm */
  static getItem(req, res) {                           
    TareaService.getItem(req.params.id)
      .then((item) => {                
          res.status(200).send({message:"tarea item", result: item });
      })                   
      .catch((reason) => {                       
        res.status(400).send({ message: reason });
      });         
  }
  
  /** Update Visual Paradingm */
  static actualizar(req, res) {    
    const { usuarioId , inicio, fin } = req.body      
     TareaService.update(req.body,req.params.id)
      .then((tarea) => {        
        TareaService.getAll(usuarioId, inicio, fin)
          .then((data) => {
            res.status(200).send({ message:"tarea registrada", result: data });
         })  
      })
      .catch((reason) => {        
        res.status(400).send({ message: reason });
      });          
  }

}
export default TareaController;


   
