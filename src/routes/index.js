const routes = require('express').Router();
const controller = require("../basket/controller"); 

routes.post("/basket/1.0/item/", async (req, res, next)=>{
    const cesta  = await controller.novoitem(req.body)
    res.status(201).json(cesta)
})

routes.delete("/basket/1.0/:id_company/:id_basket", (req, res) => {   
    controller.delete(req.params.id_basket);
    res.send("Cesta deletada")   
});

routes.delete("/basket/1.0/item/:id_company/:id_basket/:id_item/", (req, res) => {  
    p = req.params
    controller.deleteItem(p.id_basket,p.id_item);
    res.send("Item deletado")   
});

routes.put("/basket/1.0/item/:id_company/:id_basket/:id_item/:quantity", (req, res) => {  
    p = req.params
    controller.alterarQtdItem(p.id_basket,p.id_company,p.id_item,p.quantity);
    res.send("Item alterado")   
});

module.exports = routes;