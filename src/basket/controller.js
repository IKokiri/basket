const db = require("../../models");
const basket = require("../../models/basket");
db.sequelize.sync();
const Basket = db.basket


exports.get = async (req, res, next) => {

    const b = await Basket.findAll();
}


exports.post = (req) => {

    Basket.create(req.body)

}