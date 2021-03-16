const routes = require('express').Router();
const controller = require("../basket/controller"); 

routes.post("/basket/1.0/item/", async (req, res, next)=>{
    const cesta  = await controller.novoitem(req.body)
    res.status(201).json(cesta)
})

routes.delete("/basket/1.0/item/:id_company/:id_basket/:id_item/", async (req, res, next)=>{
    id_company = req.params.id_company
    id_basket = req.params.id_basket
    id_item = req.params.id_item


    const cesta  = await controller.deleteItem(id_company,id_basket,id_item)

    res.status(201).json(cesta)
})

routes.delete("/basket/1.0/:id_company/:id_basket/", async (req, res, next)=>{
    id_company = req.params.id_company
    id_basket = req.params.id_basket


    const cesta  = await controller.delete(id_company,id_basket)

    res.status(201).json(cesta)
})

routes.get("/basket/1.0/:id_company/:id_basket/", async (req, res, next)=>{
    id_company = req.params.id_company
    id_basket = req.params.id_basket

    const cesta  = await controller.buscarCesta(id_company,id_basket)

    res.status(201).json(cesta)
})


module.exports = routes;