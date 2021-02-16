const controller = require('../basket/controller');
require("mysql2/node_modules/iconv-lite").encodingExists("foo")
const { validate: uuidValidate} = require('uuid');

let id_basket = 0;
let id_item = 2;
let quantity = 120;

it('Verifica se o item foi criado no banco com os valores id_basket sendo uuid, id_item sendo 2 e quantity sendo 120', async () => {
  
  const req = {"body":{
    "id_basket":"",
    "id_item":id_item,
    "quantity":quantity
  }}

  const item = await controller.novoitem(req)
  id_basket = item.id_basket
  
  expect(uuidValidate(item.id_basket) && item.id_item == id_item && item.quantity == quantity).toBe(true);
})

it('Adiciona item à cesta existente', async () => {
  
  const req = {"body":{
    "id_basket":id_basket,
    "id_item":3,
    "quantity":200
  }}

  const item = await controller.novoitem(req)

  expect(item.id_basket == id_basket && item.id_item == 3 && item.quantity == 200).toBe(true);
})

it('Altera quantidade de itens', async () => {

  const result = await controller.alterarQtdItem(id_basket,id_item,20)
  expect(result[0]).toBe(1);
})

it('Deleta item da cesta', async () => {

  const result = await controller.deleteItem(id_basket,id_item)
  
  expect(result).toBe(1);
})

it('Deleta cesta do banco', async () => {

  const result = await controller.delete(id_basket)
  
  expect(result).toBe(1);
})



