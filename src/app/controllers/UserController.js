import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Algo deu errado' });
    }

    const { name, email, id } = await User.create(req.body);

    return res.json({
      name,
      email,
      id,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      // VERIFICA SE O oldPassword ESTA TRUE
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          // SE oldPassword TRUE
          oldPassword ? field.required() : field
        ),
      // VERIFICA SE O password ESTA TRUE
      confirmPassword: Yup.string().when('password', (password, field) =>
        // SE password TRUE
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    // getUserById
    const user = await User.findByPk(req.userId);

    if (email && email === user.email) {
      return res.status(400).json({ erro: 'O email é igual o atual' });
    }
    if (email && email === User.findOne({ email: { email } })) {
      return res
        .status(400)
        .json({ error: 'Já existe um usuário com esse email' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha errada' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
