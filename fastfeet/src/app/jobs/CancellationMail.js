import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Agendamento Cancelado',
      template: 'cancellation',
      context: {
        product: delivery.product,
        devliveryman: delivery.deliveryman,
        recipient: delivery.recipient,
      },
    });
  }
}

export default new CancellationMail();
