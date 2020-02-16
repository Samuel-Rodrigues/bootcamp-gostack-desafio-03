import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class DeliveryInProgress {
  async index(req, res) {
    const deliverysInProgress = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        start_date: { [Op.ne]: null },
        end_date: null,
        canceled_at: null,
      },
    });
    return res
      .status(200)
      .json(
        { msg: 'Estas são suas entregas em andamento: ' },
        { deliverysInProgress }
      );
  }
}

export default new DeliveryInProgress();
