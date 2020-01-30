// este import é diferente porque o yup não tem export
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      additionalAddress: Yup.string(),
      city: Yup.string().required(),
      zipCode: Yup.string()
        .required()
        .matches('^d{5}-d{3}$', 'ZIP CODE invalid. It should be 00000-000'),
      number: Yup.number()
        .required()
        .positive()
        .integer(),
    });

    // old version
    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'Validation fails' });
    // }

    const RecipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (RecipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      additional_address,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    // formatando para responder somente com os campos que fazer sentido para a interface
    return res.json({
      id,
      name,
      street,
      additionalAddress: additional_address,
      city,
      zipCode: zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const Recipient = await Recipient.findByPk(req.RecipientId);
    console.log(req.RecipientId);
    // Se trocou o email verificar se o novo email já não está cadastrado
    if (email && email !== Recipient.email) {
      const RecipientExists = await Recipient.findOne({
        where: { email: req.body.email },
      });
      if (RecipientExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    // oldPassword é valida
    if (oldPassword && !(await Recipient.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    return res.json({ ok: true });
  }
}
export default new RecipientController();
