import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionRoutes } from './routes/transactions'

export const app = fastify()

/* 
  Testes unitários: Testar uma unidade isolada da aplicação
  Testes de integração: Testar a comunicação entre duas ou mais unidades da aplicação
  Testes E2E - Ponta a ponta: Simulam um usuário operando a nossa aplicação

  Pirâmide de teste
*/

app.register(cookie)

app.register(transactionRoutes, {
  prefix: 'transactions',
})
