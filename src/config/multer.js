import multer from 'multer';

import crypto from 'crypto';

import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    // caminho que será salvo o arquivo
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),

    // Como a imagem sera formatada antes de salvar
    filename: (req, file, cb) => {
      // gera um número aleatório de 16 byts
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
