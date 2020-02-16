import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        removal_of_day: Sequelize.INTEGER,
        date_frist_removal_of_day: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'deliveryman',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' }); // as: 'avatar' é o codenome do relacionameto
    this.hasMany(models.Delivery, { as: 'deliverys' });
  }
}

export default Deliveryman;
