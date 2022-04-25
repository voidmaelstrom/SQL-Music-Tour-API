'use strict'

const today = new Date()
const tomorrow = new Date(today)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Events', [{
      event_id: Math.random(),
      name: 'The Festival Event',
      date: new Date(),
      start_time: new Date(),
      end_time: new Date(tomorrow.setDate(tomorrow.getDate() + 1))
    }])
  },

  down: async (queryInterface, Sequelize) => {
    // note that this deletes ALL data from the bands table
    await queryInterface.bulkDelete('Events', null, {})
  }
}