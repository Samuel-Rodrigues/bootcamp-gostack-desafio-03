module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('recipientes', 'nome'),

  down: (queryInterface, Sequelize) => {
    // return queryInterface.removeColumn('recipientes', 'nome')
  },
};
