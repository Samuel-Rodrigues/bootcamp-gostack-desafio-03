import * as Yup from 'yup';
import { format } from 'date-fns';
import Delivery from '../models/Delivery';
import Mail from '../../lib/Mail';
import DeliveryMan from '../models/Deliveryman';

class DeliveryCanceled {
  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Não foi encontrado o ID' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'Não existe ddelivery com esse id' });
    }

    const { name, canceled_at } = await delivery.update({
      canceled_at: true,
    });

    const deliveryMan = await DeliveryMan.findByPk(delivery.deliveryman_id);

    const dateFormat = format(
      Date.now(),
      "dd'-'MM'-'yyyy 'às' hh 'horas e 'mm 'minutos' "
    );
    await Mail.sendMail({
      to: `${deliveryMan.name} <${deliveryMan.email}`,
      subject: `Uma emcomenda foi cancelada`,
      text: `Olá, ${deliveryMan.name}. Uma encomenda foi cancelada: ${delivery.product}, Em: ${dateFormat}`,
    });

    return res.status(200).json({ name, canceled_at });
  }
}

export default new DeliveryCanceled();
