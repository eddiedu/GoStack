module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      additional_address: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zip_code: {
        type: Sequelize.STRING(9),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('recipients');
  },
};
