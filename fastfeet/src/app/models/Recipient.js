import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(100),
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        additionalAddress: Sequelize.VIRTUAL,
        additional_address: Sequelize.STRING(50),
        city: Sequelize.STRING,
        zipCode: Sequelize.VIRTUAL,
        zip_code: Sequelize.STRING(9),
      },
      {
        sequelize,
      }
    );

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
