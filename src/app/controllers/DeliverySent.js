import * as Yup from 'yup';
import { parseISO, subHours } from 'date-fns';
import Delivery from '../models/Delivery';

class DeliverySent {
  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Algum campo inválido' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    if (req.body.start_date) {
      const [, hoursComplet] = req.body.start_date.split('T');
      const [hh, mm] = hoursComplet.split(':');
      const time = `${hh}:${mm}`;

      if (time < '08:00' || time > '18:00')
        return res.status(200).json({
          error: `${time}h: Horário fora do período de entrega`,
        });

      const { start_date } = await delivery.update({
        start_date: parseISO(req.body.start_date),
      });

      return res.status(200).json({ hours: subHours(start_date, 3) });
    }

    await delivery.update(req.body);
    return res.status(200).json(delivery);
  }

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

export default new DeliverySent();
