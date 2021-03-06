const db = require("../../models");
const basket = require("../../models/Basket");
const { v4: uuidv4 } = require('uuid');

const Basket = db.Basket

gerar_id_basket = () => {
    return uuidv4();
}

exports.get =  (req, res, next) => {
    const bkt = Basket.findAll();
}

exports.novoitem = async (req) => {
    
    item = req;
    !item.id_basket?item.id_basket = gerar_id_basket():""

    const status = await Basket.create(item)
    .then(function(ret){      
      // db.sequelize.close()
      return ret;  
    }); 

    return status
    
}

exports.delete =  async (id,id_company) => {

   deletado = await Basket.destroy({where:{id_basket:id,id_company:id_company}})
   .then(function(ret){
     return ret
   });

   return deletado
   
}

exports.deleteItem =  async(id_basket,id_company,id_item) => {
   const deletado = await Basket.destroy(
     {where:
      {
        id_basket:id_basket,
        id_company:id_company,
        id_item:id_item
      }
    })
   .then(function(ret){
     return ret
   });

   return deletado
}

exports.alterarQtdItem = async (id_basket,id_item,quantity) => {
   alterado = await Basket.update({quantity:quantity},{where:{id_basket:id_basket,id_item:id_item}})
   .then(function(ret){
     return ret
   });

   return alterado
}


