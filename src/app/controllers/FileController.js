import File from '../models/File';

class FileController {
  async index(req, res) {
    const files = await File.findAll();

    return res.status(200).json(files);
  }

  async store(req, res) {
    // Pegar dados do req.file
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
