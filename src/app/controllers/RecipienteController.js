import * as Yup from 'yup';

import Recipiente from '../models/Recipiente';

class RecipienteController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Alguma coisa deu errado' });
    }

    const { nome } = req.body;

    if (await Recipiente.findOne({ where: { nome } })) {
      return res
        .status(401)
        .json({ error: 'Já existe um recipiente com esse nome' });
    }

    const { rua, numero } = await Recipiente.create(req.body);

    return res.json({
      nome,
      rua,
      numero,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Algo deu errado' });
    }

    const { nome } = req.body;

    if (await Recipiente.findOne({ where: { nome } })) {
      return res
        .status(401)
        .json({ error: 'Já existe um recipiente com esse nome' });
    }

    const recipiente = await Recipiente.findByPk(req.params.id);

    recipiente.update(req.body);

    return res.json(recipiente);
  }
}

export default new RecipienteController();
