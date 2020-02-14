import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliveryManController {
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      include: [
        {
          model: File,
          as: 'avatar',
        },
      ],
    });
    return res.status(200).json({ deliverymans });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Algum campo inválido' });
    }

    const existEmail = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (existEmail) {
      return res.status(401).json({ error: 'Já existe esse email cadastrado' });
    }

    const { name, email } = await Deliveryman.create(req.body);

    return res.status(200).json({ name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Algum campo inválido' });
    }

    const schemaFile = Yup.object().shape({
      originalname: Yup.string(),
      filename: Yup.string(),
    });

    if (!(await schemaFile.isValid(req.file))) {
      return res.status(401).json({ error: 'Algum campo inválido' });
    }

    if (req.file) {
      const { originalname: name, filename: path } = req.file;
      const { id } = await File.create({
        name,
        path,
      });

      const deliveryman = await Deliveryman.findByPk(req.params.id);
      const newDeliveryman = await deliveryman.update({ avatar_id: id });
      return res.status(200).json(newDeliveryman);
    }

    const existEmail = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (existEmail) {
      return res
        .status(401)
        .json({ error: 'Já existe um usuário com esse email' });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    await deliveryman.update(req.body);

    return res.status(200).json({ deliveryman });
  }

  async delete(req, res) {
    const existeDeliveryMan = await Deliveryman.findByPk(req.params.id);

    if (!existeDeliveryMan) {
      return res
        .status(401)
        .json({ erro: 'Não existe entregador com esse Id' });
    }

    await existeDeliveryMan.destroy();

    return res.status(200).json();
  }
}

export default new DeliveryManController();
