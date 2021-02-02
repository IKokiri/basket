const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send(`Busca todos`);
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