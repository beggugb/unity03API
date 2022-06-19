import database from "../../src/models";

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Tarea, Usuario } = database;

class TareaService {  

  /** Update Visual Paradingm */
  static delete(datoId) {
    return new Promise((resolve, reject) => {
      Tarea.destroy({ where: { id: Number(datoId) } })
        .then((rows) => resolve({ message: 'eliminado' }))
        .catch((reason)  => reject({ message: reason.message }))      
    });
  }
  

  /** Update Visual Paradingm */
  static getAll(usuarioId, inicio, end) {        
    return new Promise((resolve, reject) => {            
        Tarea.findAll({
            order: [['start', 'DESC']],    
            attributes: ["id","title","start","end","backgroundColor","selectable","usuarioId","classNames","detalle"],        
            where: {
              [Op.and]: [{ usuarioId: { [Op.eq]: usuarioId }},                    
                         { start: {[Op.between]: [inicio, end]}}]
            },    
        })
        .then((tareas) => {resolve(tareas)})
        .catch((reason) => {reject({ message: reason.message, data: null })});
       });
  }
  
  /** Update Visual Paradingm */
  static add(newTarea) {    
    return new Promise((resolve, reject) => {        
      Tarea.create(newTarea)
            .then((result)  => { resolve({ message: "success" })})
            .catch((reason) => { reject({ message: reason.message })});        
    });
  } 

  /** Update Visual Paradingm */
  static getItem(pky){
    return new Promise((resolve,reject) =>{
      Tarea.findByPk(pky,{
          raw: true,
          nest: true,
          attributes: ["id","title","start","end","backgroundColor","selectable","usuarioId","detalle"]
        })
        .then((row)=> resolve( row ))
        .catch((reason) => reject({ message: reason.message }))
    })
  }

  /** Update Visual Paradingm */
  static update(newTarea,datoId) {    
    return new Promise((resolve, reject) => {        
      Tarea.update(newTarea, { where: { id: Number(datoId) } })
        .then((result)  => { resolve({ message: "success" }) })
        .catch((reason) => { reject({ message: reason.message })});
    });
  }
}

export default TareaService;
