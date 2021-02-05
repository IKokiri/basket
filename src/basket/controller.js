const db = require("../../models");
const basket = require("../../models/basket");
const { v4: uuidv4 } = require('uuid');
db.sequelize.sync();
const Basket = db.basket


exports.get = async (req, res, next) => {
    const bkt = await Basket.findAll();
}

exports.post = (req) => {
    Basket.create(req.body)
}