module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // tabela
      'avatar_id', // coluna
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'files', // tabela
          key: 'id', // campo
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
