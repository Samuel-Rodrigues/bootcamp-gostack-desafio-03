module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'deliveryman',
      'removal_of_day',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      'frist_removal_of_day',
      { type: Sequelize.DATE, allowNull: true }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn(
      'deliveryman',
      'removal_of_day',
      'frist_removal_of_day'
    );
  },
};
