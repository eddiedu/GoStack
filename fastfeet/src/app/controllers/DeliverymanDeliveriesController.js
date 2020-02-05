// este import é diferente porque o yup não tem export
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import User from '../models/User';
import File from '../models/File';

class DeliverymanDeliveriesController {
  async index(req, res) {
    const list = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
      },
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
            { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
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
    });
    return res.json(list);
  }
}
export default new DeliverymanDeliveriesController();
