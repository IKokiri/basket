const controller = require('../basket/controller');
require("mysql2/node_modules/iconv-lite").encodingExists("foo")
const { validate: uuidValidate} = require('uuid');
const faker = require('faker');

let id_basket = 0;
let id_item = 2;
let id_company = faker.random.uuid();
let quantity = faker.random.number();

it('Criação de item no banco', async () => {
  
  const req = {
    "id_basket":"",
    "id_item":id_item,
    "id_company":id_company,
    "quantity": quantity
  }

  const item = await controller.novoitem(req)
  id_basket = item.id_basket
  
  expect(uuidValidate(item.id_basket) && item.id_company == id_company && item.id_item == id_item && item.quantity == quantity).toBe(true);
})

it('Adiciona item à cesta existente', async () => {
  
  const req = {
    "id_basket":id_basket,
    "id_company":id_company,
    "id_item":3,
    "quantity":faker.random.number({'min':1,'max':1000})
  }

  const item = await controller.novoitem(req)

  expect(item.id_basket == id_basket && item.id_item == 3 && item.quantity == req.quantity).toBe(true);
})

it('Altera quantidade de itens', async () => {

  const result = await controller.alterarQtdItem(id_basket,id_item,20)
  expect(result[0]).toBe(1);
})

it('Deleta item da cesta de uma company', async () => {

  const result = await controller.deleteItem(id_basket,id_company,id_item)
  
  expect(result).toBe(1);
})

it('Deleta cesta do banco', async () => {

  const result = await controller.delete(id_basket,id_company)
  
  expect(result).toBe(1);

})



