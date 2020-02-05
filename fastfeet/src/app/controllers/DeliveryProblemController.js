import User from '../models/User';
import File from '../models/File';
import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';
import Recipient from '../models/Recipient';

class DeliveryProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: ['product', 'start_date', 'end_date', 'canceled_at'],
          include: [
            {
              model: File,
              as: 'signature',
              attributes: ['name', 'path', 'url'],
            },
            {
              model: User,
              as: 'deliveryman',
              attributes: ['id', 'name', 'email'],
              include: [
                {
                  model: File,
                  as: 'avatar',
                  attributes: ['name', 'path', 'url'],
                },
              ],
            },
            {
              model: Recipient,
              as: 'recipient',
              attributes: [
                'id',
                'name',
                'street',
                'number',
                'additionalAddress',
                'city',
                'zipCode',
              ],
            },
          ],
        },
      ],
    });

    return res.json(problems);
  }
}
export default new DeliveryProblemController();
