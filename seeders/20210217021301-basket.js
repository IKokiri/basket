'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    
     await queryInterface.bulkInsert('baskets', [{
       id_company: "6b6e5f66-70c6-11eb-9439-0242ac130002",
       id_basket: faker.random.uuid(),
       id_item: faker.random.number({"min":1,"max":100}),
       quantity: faker.random.number({"min":1,"max":100})
     }], {});
     
     await queryInterface.bulkInsert('baskets', [{
      id_company: "6b6e5f66-70c6-11eb-9439-0242ac130002",
      id_basket: faker.random.uuid(),
      id_item: faker.random.number({"min":1,"max":100}),
      quantity: faker.random.number({"min":1,"max":100})
    }], {});
    
    await queryInterface.bulkInsert('baskets', [{
      id_company: faker.random.uuid(),
      id_basket: faker.random.uuid(),
      id_item: faker.random.number({"min":1,"max":100}),
      quantity: faker.random.number({"min":1,"max":100})
    }], {});
    
    await queryInterface.bulkInsert('baskets', [{
      id_company: faker.random.uuid(),
      id_basket: faker.random.uuid(),
      id_item: faker.random.number({"min":1,"max":100}),
      quantity: faker.random.number({"min":1,"max":100})
    }], {});
     
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
