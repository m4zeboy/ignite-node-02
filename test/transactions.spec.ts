import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

describe('Transaction Routes', () => {
  // antes de todos os testes (e não antes de cada teste), aguarde o app ficar pronto (esperar todas as funções assíncronas terminarem)
  beforeAll(async () => {
    await app.ready()
  })
  // Depois de todos os testes (e não depois de cada teste), fechar o app, isso o removerá da memória.
  afterAll(async () => {
    await app.close()
  })

  // testes end to end: o ideal é depois de executar cada teste ter um ambiente zerado, incluindo o banco de dados
  beforeEach(() => {
    execSync('npm run knex -- migrate:rollback --all')
    execSync('npm run knex -- migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Market shopping',
        amount: 256,
        type: 'debit',
      })
      .expect(201)
  })

  // jamais pode escrever um teste que depende de outro teste
  // deve se criar cada teste partindo do princípio de que os outros teste NÃO existem (do total zero)
  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Market shopping',
        amount: 256,
        type: 'debit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Market shopping',
        amount: -256,
      }),
    ])
  })
})
