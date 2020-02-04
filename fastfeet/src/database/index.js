/* Iniciar conexão com o banco de dados e carregar os Models */
import Sequelize from 'sequelize';

import FileUtils from '../utils/FileUtils';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Recipient, Deliveryman, File, Delivery];

class Database {
  constructor() {
    this.init();
  }

  async init() {
    this.connection = new Sequelize(databaseConfig);

    if (!(await this.checkIfMissingModel())) {
      console.error('Missing models on database/index.js');
    }

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  /**
   * Caso esqueça de cadastrar algum model me notificar
   * O Ideal seria depois carregar os models do
   */
  async checkIfMissingModel() {
    const listFiles = await FileUtils.listFiles('../app/models');

    let isOk = true;
    listFiles.map(fileName => {
      if (!models.find(m => fileName === m.name)) {
        console.error(`Nao encontrou ${fileName}`);
        isOk = false;
        return null;
      }
      return fileName;
    });
    return isOk;
  }
}

export default new Database();
