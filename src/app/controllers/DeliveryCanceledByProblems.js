import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryProblems from '../models/DeliveryProblems';

class DeliveryCeleledByProblems {
  async update(req, res) {
    const delivery = await Delivery.findOne({
      include: [
        {
          model: DeliveryProblems,
          as: 'problems',
          attributes: ['description'],
          where: { id: req.params.id },
        },
      ],
    });
    /**
 * Tratamento de dadas
 
    const dateNow = Date.now();

    const dateConverted = toDate(dateNow);
*/
    await delivery.update({ canceled_at: true });

    return res.status(200).json(delivery);
  }

  async index(req, res) {
    const delivery = await Delivery.findAll({
      include: [
        {
          model: DeliveryProblems,
          as: 'problems',
          attributes: ['description'],
          where: {
            description: { [Op.ne]: null },
          },
          required: true,
        },
      ],
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'DeliverymanId',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
      ],
    });

    return res.json(delivery);
  }
}

export default new DeliveryCeleledByProblems();
