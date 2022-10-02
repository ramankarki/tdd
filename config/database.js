const { Sequelize } = require('sequelize')
const config = require('config')

const { name, username, password, dialect, storage } = config.get('database')

module.exports = new Sequelize(name, username, password, {
  dialect,
  storage,
})
