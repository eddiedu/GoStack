import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(100),
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        additionalAddress: {
          type: Sequelize.VIRTUAL,
          // get() {
          //   return this.additional_address;
          // },
        },
        additional_address: Sequelize.STRING(50),
        city: Sequelize.STRING,
        zipCode: {
          type: Sequelize.VIRTUAL,
          // get() {
          //   return this.zip_code;
          // },
        },
        zip_code: Sequelize.STRING(9),
      },
      {
        sequelize,
      }
    );
    /**
     * Coloquei este método somente no Recipient para testar
     * a mensagem sem o _ e usando camel case padronizando
     * as mensagens
     */
    this.addHook('beforeSave', async recipient => {
      if (recipient.additionalAddress) {
        recipient.additional_address = recipient.additionalAddress;
      }
      if (recipient.zipCode) {
        recipient.zip_code = recipient.zipCode;
      }
    });

    return this;
  }
}

export default Recipient;
