// este import é diferente porque o yup não tem export
import User from '../models/User';
import File from '../models/File';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import schemasDeliveryman from '../schemas/deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymen = await User.findAll({
      where: { deliveryman: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = schemasDeliveryman.storeSchema;

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    const delivery = await Delivery.findByPk(req.params.id);
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    try {
      const { id, description, delivery_id } = await DeliveryProblem.create({
        delivery_id: req.params.id,
        ...req.body,
      });

      return res.json({
        id,
        description,
        delivery_id,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new DeliverymanController();
