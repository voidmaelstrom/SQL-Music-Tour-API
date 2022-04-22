'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StageEvents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stage_events_id: {
        type: Sequelize.INTEGER
      },
      stage_id: {
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.SMALLINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StageEvents');
  }
};