const controller = require('../basket/controller');
require("mysql2/node_modules/iconv-lite").encodingExists("foo")
const { validate: uuidValidate} = require('uuid');
const faker = require('faker');

var requisicao = {
  "id_company":'',
  "id_basket":"",
  "id_item":"",
  "quantity":""
}
var requisicaoQtt = {
  "quantity":""
}
var params = {
  "id_company":'',
  "id_basket":"",
  "id_item":"",
  "quantity":""
}

describe("Testes de novoitem",()=>{
  it('Criação de um item. Insere um item novo no banco', async () => {
  
    requisicao.id_company = faker.random.uuid()
    requisicao.id_basket = faker.random.uuid()
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})

    retorno = await controller.novoitem(requisicao)

    dados_criados = {
      "id_company":retorno.dataValues.id_company,
      "id_basket":retorno.dataValues.id_basket,
      "id_item":retorno.dataValues.id_item,
      "quantity":retorno.dataValues.quantity
    }

    expect(requisicao).toEqual(dados_criados);
  })

  it('Inserção de itens com compos obrigatorios faltando, um item não pode ser inserido com dads obrigatórios faltantes', async function(){
    
    requisicao.id_company = ''
    requisicao.id_basket = faker.random.uuid()
    requisicao.id_item = ''
    requisicao.quantity = ''

    retorno = await controller.novoitem(requisicao)

    expect('Necessário preencher todos os campos obrigatorios').toBe(retorno.err)

  })

  it('Inserção de novo item para criação de cesta, quando é enviada uma cesta sem ID é necessário criar uma aleatória', async function(){
      
    requisicao.id_company = faker.random.uuid()
    requisicao.id_basket = ''
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})
    
    retorno = await controller.novoitem(requisicao)

    dados_criados = {
      "id_company":retorno.dataValues.id_company,
      "id_basket":retorno.dataValues.id_basket,
      "id_item":retorno.dataValues.id_item,
      "quantity":retorno.dataValues.quantity
    }

    requisicao.id_basket = retorno.dataValues.id_basket

    expect(requisicao).toEqual(dados_criados);

  })

})

describe('alterações de item', () =>{
  it('Alteração quantidade de item, um item deve ter sua quantidade alterada', async ()=>{
    requisicaoQtt.quantity = faker.random.number({"min":1,"max":1000})
    result = await controller.alterarQtdItem(requisicao.id_company,requisicao.id_basket,requisicao.id_item,requisicaoQtt)

    expect(result[0]).toBe(1);
  })

  it('alteração de quantidade, Não é possivel alterar para uma quantidade negativa', async()=>{
    requisicaoQtt.quantity = faker.random.number({"min":-1000,"max":-1})
    
    let result = await controller.alterarQtdItem(requisicao.id_company,requisicao.id_basket,requisicao.id_item,requisicaoQtt)

    expect('Necessário preencher todos os campos obrigatorios').toBe(result.err)
  })
})

describe('remoção de cestas de uma company',()=>{

  it('Remoção de 3 cestas(todas as cestas de uma determinada empresa), uma id de cesta existente deve ser excluido',async()=>{

    // Criação da de dados para teste
    requisicao.id_company = faker.random.uuid()
    requisicao.id_basket = faker.random.uuid()
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})

    retorno = await controller.novoitem(requisicao)
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})
    retorno = await controller.novoitem(requisicao)
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})
    retorno = await controller.novoitem(requisicao)
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})    
    dados_criados = {
      "id_company":retorno.dataValues.id_company,
      "id_basket":retorno.dataValues.id_basket,
    }
    // Criação da de dados para teste

    retorno = await controller.delete(dados_criados.id_company,dados_criados.id_basket)

    expect(retorno).toBe(3)

  })

  it("falha na remoção sem campos obrigatorios (id_company ou id_basket), Caso os campos obrigatorios não sejam enviados os registros não podem ser excluidos",async()=>{

    let result = await controller.delete('','')
    expect('Necessário preencher todos os campos obrigatorios').toBe(result.err)
  })

})

describe('remoção de itens de uma compania',() => {
  it('uma cesta deve ser removida, uma cesta deve ser removida quando os dados existenstes são enviados',async()=>{
    // Criação da de dados para teste
    requisicao.id_company = faker.random.uuid()
    requisicao.id_basket = faker.random.uuid()
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})

    retorno = await controller.novoitem(requisicao)

    dados_criados = {
      "id_company":retorno.dataValues.id_company,
      "id_basket":retorno.dataValues.id_basket,
      "id_item":retorno.dataValues.id_item,
    }
    // Criação da de dados para teste

    retorno = await controller.deleteItem(dados_criados.id_company,dados_criados.id_basket,dados_criados.id_item)
    expect(1).toBe(1);

  })

  it("falha na remoção sem campos obrigatorios (id_company,id_basket ou id_item ), Caso os campos obrigatorios não sejam enviados os registros não podem ser excluidos",async()=>{

    let result = await controller.deleteItem('','','')
    expect('Necessário preencher todos os campos obrigatorios').toBe(result.err)
  })
})

describe('regata todos os item de uma cesta',()=>{
  it('resgata todos os itens de uma cesta, quando uma cesta de uma empresa é buscada todos os itens são retornados', async()=>{
    
    // Criação da de dados para teste
    requisicao.id_company = faker.random.uuid()
    requisicao.id_basket = faker.random.uuid()
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})

    retorno = await controller.novoitem(requisicao)
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})
    retorno = await controller.novoitem(requisicao)
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})
    retorno = await controller.novoitem(requisicao)
    requisicao.id_item = faker.random.uuid()
    requisicao.quantity = faker.random.number({"min":1,"max":1000})    
    dados_criados = {
      "id_company":retorno.dataValues.id_company,
      "id_basket":retorno.dataValues.id_basket,
    }
    // Criação da de dados para teste

    let result = await controller.buscarCesta(dados_criados.id_company,dados_criados.id_basket);

    expect(result.length).toBe(3)
  })
})