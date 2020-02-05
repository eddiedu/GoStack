import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Agendamento Entrega',
      template: 'delivery',
      context: {
        product: delivery.product,
        devliveryman: delivery.deliveryman,
        recipient: delivery.recipient,
      },
    });
  }
}

export default new DeliveryMail();
