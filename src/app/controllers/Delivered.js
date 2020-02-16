import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class DeliveredController {
  async index(req, res) {
    const delivered = await Delivery.findAll({
      where: { deliveryman_id: req.params.id, end_date: { [Op.ne]: null } },
    });
    return res
      .status(200)
      .json({ msg: 'Estas são suas entregas finalizadas: ', delivered });
  }
}

export default new DeliveredController();
