import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    // Verifica se existe um usuário
    if (!user) {
      return res.status(401).json({ error: 'Usuário não existe' });
    }

    // Verifica se o password esta batendo com o db
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha errada' });
    }

    const { id, name } = user;

    // Retornando para o cliente
    // dois obj: User, token
    // Token: { id do user}, 'Texto secreto chave ', { tempo de expiracao do token }
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
