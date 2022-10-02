const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

const User = require('./model/user.model')

app.use(express.json())

app.use(express.static(__dirname + '/client'))

app.post('/api/1.0/users', async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10)
  // await User.create(req.body)
  await User.create({ ...req.body, password })
  res.status(201).json({ message: 'user created' })
})

module.exports = app
