import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryFinishedController {
  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data não informada' });
    }

    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(400).json({ error: 'Entrega não existe' });
    }

    await delivery.update(req.body);

    return res.status(200).json({ delivery });
  }
}

export default new DeliveryFinishedController();
