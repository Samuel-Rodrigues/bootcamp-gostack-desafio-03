import * as Yup from 'yup';
import { isToday } from 'date-fns';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/Deliveryman';

class DeliverySent {
  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Algum campo inválido' });
    }

    const delivery = await Delivery.findByPk(req.params.id);
    const deliveryman = await DeliveryMan.findByPk(req.body.deliveryman_id);

    const [, hoursComplet] = req.body.start_date.split('T');
    const [hh, mm] = hoursComplet.split(':');
    const time = `${hh}:${mm}`;

    if (time < '08:00' || time > '18:00')
      return res.status(200).json({
        error: `${time}h: Horário fora do período de entrega`,
      });
    /**
     * Checando DeliveryMan
     */

    if (!isToday(deliveryman.date_frist_removal_of_day)) {
      deliveryman.removal_of_day = 0;
    }

    if (deliveryman.removal_of_day >= 5)
      return res.status(400).json({ error: 'Você já tem 5 encomendas hoje' });

    const {
      removal_of_day,
      date_frist_removal_of_day,
    } = await deliveryman.update({
      removal_of_day: deliveryman.removal_of_day + 1,
      date_frist_removal_of_day: isToday(deliveryman.date_frist_removal_of_day)
        ? deliveryman.date_frist_removal_of_day
        : req.body.start_date,
    });

    await delivery.update(req.body);
    return res.status(200).json({
      count: removal_of_day,
      data_inicial: date_frist_removal_of_day,
      delivery,
    });
  }
}

export default new DeliverySent();
