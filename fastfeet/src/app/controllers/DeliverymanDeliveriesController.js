// este import é diferente porque o yup não tem export
import * as Yup from 'yup';
import {
  parseISO,
  startOfHour,
  addHours,
  format,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isAfter,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';
import Queue from '../../lib/Queue';
import DeliveryMail from '../jobs/DeliveryMail';

class DeliverymanDeliveriesController {
  async index(req, res) {
    const list = await Delivery.findAll({
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Deliveryman,
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
