import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipiente';
import DeliveryMan from '../models/Deliveryman';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const deliverys = await Delivery.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'url', 'path'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'nome'],
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return res.status(200).json(deliverys);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Algum campo inválido' });
    }

    const existRecipient = await Recipient.findByPk(req.body.recipient_id);

    if (!existRecipient) {
      return res.status(401).json({ error: 'Não existe esse destinatário' });
    }

    const existDeliveryMan = await DeliveryMan.findByPk(
      req.body.deliveryman_id
    );

    if (!existDeliveryMan) {
      return res.status(401).json({ error: 'Não existe esse entregador' });
    }

    const existDelivery = await Delivery.findOne({
      where: {
        recipient_id: req.body.recipient_id,
        deliveryman_id: req.body.deliveryman_id,
        product: req.body.product,
      },
    });

    if (existDelivery) {
      return res.status(401).json({ error: 'Essa encomenda já existe' });
    }

    const delivery = await Delivery.create(req.body);

    return res.status(200).json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Algum campo inválido' });
    }

    // StartDate
    const schemaStartDate = Yup.object().shape({
      date: Yup.date(),
    });

    if (!(await schemaStartDate.isValid(req.query))) {
      return res.status(401).json({ error: 'Data inválida' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    await delivery.update(req.body);
    return res.status(200).json(delivery);
  }

  async delete(req, res) {
    const existDelivery = await Delivery.findByPk(req.params.id);

    if (!existDelivery) {
      return res.status(401).json({ erro: 'Não existe encomenda com esse id' });
    }

    await existDelivery.destroy();

    return res.status(200).json();
  }
}

export default new DeliveryController();
