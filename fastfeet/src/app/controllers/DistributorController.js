import Delivery from '../models/Delivery';
import User from '../models/User';
import File from '../models/File';
import Recipient from '../models/Recipient';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DistributorController {
  async store(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
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
    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const {
      id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = await delivery.update({
      canceled_at: new Date(),
    });

    await Queue.add(CancellationMail.key, { delivery });

    return res.json({
      id,
      product,
      canceled_at,
      start_date,
      end_date,
    });
  }
}
export default new DistributorController();
