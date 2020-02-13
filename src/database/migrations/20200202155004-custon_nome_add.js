module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('recipientes', 'nome', {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    }),

  down: (queryInterface, Sequelize) => {},
};
