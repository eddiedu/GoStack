import { startOfDay, parseISO, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import File from '../models/File';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const itemsPerPage = 20;

    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointmens = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: ['date'],
      // attributes: ['id', 'date'],
      // limit: itemsPerPage,
      // offset: (page - 1) * itemsPerPage,
      // include: [
      //   {
      //     model: User,
      //     as: 'provider',
      //     attributes: ['id', 'name'],
      //     include: [
      //       { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      //     ],
      //   },
      // ],
    });

    return res.json(appointmens);
  }
}

export default new ScheduleController();
