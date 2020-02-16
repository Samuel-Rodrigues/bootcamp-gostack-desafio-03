module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'deliveryman',
      'date_frist_removal_of_day',
      { type: Sequelize.DATE, allowNull: true }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliveryman', 'frist_removal_of_day');
  },
};
