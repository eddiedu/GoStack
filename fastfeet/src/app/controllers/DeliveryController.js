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

class DeliveryController {
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

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    const recipientExists = await Recipient.findByPk(req.body.recipient_id);
    if (!recipientExists) {
      return res.status(400).json({ error: "Recipient doesn't exists" });
    }
    const deliverymanExists = await Deliveryman.findByPk(
      req.body.deliveryman_id
    );
    if (!deliverymanExists) {
      return res.status(400).json({ error: "Deliveryman doesn't exists" });
    }

    if (req.params.signature_id && req.params.signature_id > 0) {
      const signatureExists = await File.findByPk(req.body.signature_id);
      if (!signatureExists) {
        return res.status(400).json({ error: "Signature doesn't exists" });
      }
    }

    const {
      id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = await Delivery.create(req.body);

    // Notificar o entregador
    const delivery = await Delivery.findByPk(id, {
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
    await Queue.add(DeliveryMail.key, { delivery });

    // formatando para responder somente com os campos que fazer sentido para a interface
    return res.json({
      id,
      product,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliver = await Delivery.findByPk(req.params.id);

    if (req.body.start_date) {
      // Verificar se está dentro do range definido
      const startDate = parseISO(req.body.start_date);
      const hourBegin = setSeconds(setMinutes(setHours(startDate, 8), 0), 0);
      const hourEnd = setSeconds(setMinutes(setHours(startDate, 18), 0), 0);

      if (isBefore(startDate, hourBegin)) {
        return res
          .status(400)
          .json({ error: 'Start date should be after 08:00' });
      }
      if (isAfter(startDate, hourEnd)) {
        return res
          .status(400)
          .json({ error: 'Start date should be before 18:00' });
      }
    }

    const { id, product } = await deliver.update(req.body);

    return res.json({
      id,
      product,
    });
  }

  async delete(req, res) {
    const deliverExists = await Delivery.findByPk(req.params.id);

    if (!deliverExists) {
      return res.status(400).json({ error: "Deliver doesn't exists" });
    }
    try {
      deliverExists.destroy();
      return res.json({ message: 'Deliver deleted' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: 'Error to delete' });
    }
  }
}
export default new DeliveryController();
