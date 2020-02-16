import * as Yup from 'yup';
import DeliveryProblems from '../models/DeliveryProblems';

class DeliveryProblemsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      delivery_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Descrição inválida' });
    }

    const { id, description, delivery_id } = await DeliveryProblems.create(
      req.body
    );

    return res.status(200).json({ id, description, delivery_id });
  }
}

export default new DeliveryProblemsController();
