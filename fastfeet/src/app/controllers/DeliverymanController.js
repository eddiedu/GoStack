// este import é diferente porque o yup não tem export
import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import schemas from '../schemas/deliveryman';

class DeliverymanController {
  async index(req, res) {
    const list = await Deliveryman.findAll({
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(list);
  }

  async store(req, res) {
    const schema = schemas.storeSchema;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists' });
    }

    const { id, name, email, avatar_id } = await Deliveryman.create(req.body);

    // formatando para responder somente com os campos que fazer sentido para a interface
    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async update(req, res) {
    const schema = schemas.updateSchema;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);
    console.log(`Deliveryman id ${req.params.id}`);
    // Se trocou o email verificar se o novo email já não está cadastrado
    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email: req.body.email },
      });
      if (deliverymanExists) {
        return res.status(400).json({ error: 'Deliveryman already exists' });
      }
    }

    const { id, name } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const deliverymanExists = await Deliveryman.findByPk(req.params.id);

    if (!deliverymanExists) {
      return res.status(400).json({ error: "Deliveryman doesn't exists" });
    }
    try {
      deliverymanExists.destroy();
      return res.json({ message: 'Deliveryman deleted' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Error to delete' });
    }
  }
}
export default new DeliverymanController();
