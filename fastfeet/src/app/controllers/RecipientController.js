// este import é diferente porque o yup não tem export
import schemas from '../schemas/recipients';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const list = await Recipient.findAll();
    return res.json(list);
  }

  async store(req, res) {
    const schema = schemas.storeSchema;

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    try {
      const {
        id,
        name,
        street,
        additionalAddress,
        city,
        zipCode,
      } = await Recipient.create(req.body);

      // formatando para responder somente com os campos que fazer sentido para a interface
      return res.json({
        id,
        name,
        street,
        additionalAddress,
        city,
        zipCode,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async update(req, res) {
    const schema = schemas.storeSchema;

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    const recipientExists = await Recipient.findByPk(req.params.id);

    if (!recipientExists) {
      return res.status(400).json({ error: "Recipient doesn't exists" });
    }

    const { name, street, additionalAddress, city, zipCode } = req.body;

    await Recipient.update(
      {
        name,
        street,
        additional_address: additionalAddress,
        city,
        zip_code: zipCode,
      },
      {
        where: { id: req.params.id },
      }
    );
    return res.json({ message: 'Recipient updated' });
  }

  async delete(req, res) {
    const recipientExists = await Recipient.findByPk(req.params.id);

    if (!recipientExists) {
      return res.status(400).json({ error: "Recipient doesn't exists" });
    }
    try {
      recipientExists.destroy();
      return res.json({ message: 'Recipient deleted' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Error to delete' });
    }
  }
}
export default new RecipientController();
