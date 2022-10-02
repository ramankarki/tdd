const app = require('./app')
const port = 8000
const sequelize = require('./config/database')

sequelize.sync()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
