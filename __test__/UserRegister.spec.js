const request = require('supertest')
const app = require('../app')
const User = require('../model/user.model')
const sequelize = require('../config/database')

beforeAll(() => {
  return sequelize.sync()
})

beforeEach(() => {
  return User.destroy({ truncate: true })
})

const createUser = () =>
  request(app).post('/api/1.0/users').send({
    username: 'username',
    email: 'user@gmail.com',
    password: 'password',
  })

describe('User registration', () => {
  it('Returns 201 OK when signup request is valid.', async () => {
    const res = await createUser()
    expect(res.status).toBe(201)
  })

  it('Returns success message when signup.', async () => {
    const res = await createUser()
    expect(res.body.message).toBe('user created')
  })

  it('Saves the user to database.', async () => {
    const res = await createUser()
    const users = await User.findAll()
    expect(users.length).toBe(1)
  })

  it('Saves username and password to database.', async () => {
    const res = await createUser()
    const users = await User.findAll()
    expect(users[0].username).toBe('username')
    expect(users[0].email).toBe('user@gmail.com')
  })

  it('Hashes password before saving to the database.', async () => {
    const res = await createUser()
    const users = await User.findAll()
    expect(users[0].password).not.toBe('password')
  })
})
