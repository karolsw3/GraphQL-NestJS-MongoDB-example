import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from '../src/users/interfaces/user.interface';
import * as request from 'supertest';

describe('UsersController (e2e)', () => {
  let app;
  const user: User = {
    name: 'Gabriel',
    email: 'gabriel@test.com',
    password: 'F9&^3#bqPoFz'
  }
  let id = ''

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        MongooseModule.forRoot('mongodb://localhost/nestjstesting'),
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.qgl'
        })
      ]
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('creates a new user', async () => {
    const createUserQuery = `
      mutation {
        createUser(input: {
          name: "Gabriel",
          email: "gabriel@test.com",
          password: "F9&^3#bqPoFz"
        }) {
          id
          name
          email
        }
      }
    `
    const response = await request(app.getHttpServer())
      .post(`/graphql`)
      .send({
        operationName: null,
        query: createUserQuery
      })
    expect(response.status).toBe(200)

    const data = response.body.data.createUser
    expect(data.name).toBe(user.name)
    expect(data.email).toBe(user.email)
    id = data.id
  })

  it('gets users', async () => {
    const response = await request(app.getHttpServer())
      .post(`/graphql`)
      .send({
        operationName: null,
        query: `{
          users { name, email }
        }`
      })
    expect(response.status).toBe(200)

    const users = response.body.data.users
    expect(users.length).toBeGreaterThan(0)
    const userResult = users[0]
    expect(userResult.name).toBe(user.name)
    expect(userResult.email).toBe(user.email)
  })

  it('gets user by id', async () => {
    const response = await request(app.getHttpServer())
      .post(`/graphql`)
      .send({
        operationName: null,
        query: `{
          getUser(id: "${id}") { 
            name, email 
          }
        }`
      })
    expect(response.status).toBe(200)
    const userResult = response.body.data.getUser
    expect(userResult.name).toBe(user.name)
    expect(userResult.email).toBe(user.email)
  })

  it('updates a user', async () => {
    const updatedUser: User = {
      name: 'Gabriel',
      email: 'gabrielsnewmail@gmail.com',
      password: 'F9&^3#bqPoFz'
    }
    const updateUserQuery = `
      mutation {
        updateUser(
        id: "${id}",
        input: {
          name: "${updatedUser.name}",
          email: "${updatedUser.email}",
          password: "${updatedUser.password}"
        }) {
          email
        }
      }
    `
    const response = await request(app.getHttpServer())
      .post(`/graphql`)
      .send({
        operationName: null,
        query: updateUserQuery
      })
    expect(response.status).toBe(200)
    const userResult = response.body.data.updateUser
    expect(userResult.email).toBe(updatedUser.email)
  })

  it('removes a user', async () => {
    const response = await request(app.getHttpServer())
      .post(`/graphql`)
      .send({
        operationName: null,
        query: `
          mutation {
            deleteUser(id: "${id}") {
              id
            }
          }
        `
      })
    expect(response.status).toBe(200)
    expect(response.body.data.deleteUser.id).toBe(id)
  })
})

