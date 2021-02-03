const routes = require('express').Router();
const controller = require("../basket/controller");

routes.get('/', (req, res) => {
    controller.get()
});

routes.get('/:id', (req, res) => {
    res.send(`busca ${req.params.id}`);
});

routes.post('/', (req, res) => {
    console.log(req.body)
    res.send("inserido")
});

routes.put('/:id', (req, res) => {
    console.log(req.params)
    console.log(req.body)
    res.send(`alterado`);
});

routes.delete('/:id', (req, res) => {
    console.log(req.params)
    res.send(`removido`);
});

module.exports = routes;