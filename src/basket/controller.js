const db = require("../../models");
const basket = require("../../models/");
const { v4: uuidv4 } = require('uuid');

const Basket = db.Basket

gerar_id_basket = () => {
    return uuidv4();
}

exports.get =  (req, res, next) => {
    const bkt = Basket.findAll();
}

// Funções 1.1
exports.novoitem = async (req) => {
    
    item = req;
     
    !item.id_basket?item.id_basket = gerar_id_basket():""

    if(!item.id_company || !item.id_item || !item.quantity || !item.id_basket){
      return {'err':'Necessário preencher todos os campos obrigatorios'};
    }

    const status = await Basket.create(item)
    .then(function(ret){      
      return ret;  
    }); 

    return status    
}

// Funções 1.2
exports.deleteItem =  async(id_company,id_basket,id_item) => {  

  if(!id_company || !id_basket || !id_item){
    return {'err':'Necessário preencher todos os campos obrigatorios'};
  }

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

// Funções 1.3
exports.delete =  async (id_company,id_basket) => {
  
  if(!id_company || !id_basket){
    return {'err':'Necessário preencher todos os campos obrigatorios'};
  }

  deletado = await Basket.destroy({where:{id_basket:id_basket,id_company:id_company}})
  .then(function(ret){
    return ret
  });

  return deletado
   
}

// Funções 1.4
exports.alterarQtdItem = async (id_company,id_basket,id_item,item) => {

  if(!id_company || !id_item || !id_basket || item.quantity <= 0){
    return {'err':'Necessário preencher todos os campos obrigatorios'};
  }

   alterado = await Basket.update({quantity:item.quantity},{where:{id_company:id_company,id_basket:id_basket,id_item:id_item}})
   .then(function(ret){
     return ret
   });

   return alterado
}

// Funções 1.5
exports.buscarCesta = async(id_company,id_basket)=>{

  ret = await Basket.findAll({where:{
    id_company:id_company,
    id_basket:id_basket
  }})

  return ret;
}


