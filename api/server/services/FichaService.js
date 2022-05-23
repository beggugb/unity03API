import database from "../../src/models";
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { Ficha } = database;

class FichaService {

    static setAdd(value){
        return new Promise((resolve,reject) =>{
            Ficha.create(value)
            .then((row) => resolve( row ))
            .catch((reason)  => reject({ message: reason.message }))  
        })
    } 

   
}
export default FichaService;
