/* eslint-disable prettier/prettier */
import { Knex } from 'knex'

export async function up(knex: Knex) {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('amount', 10, 2).notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex) {
  await knex.schema.dropTable('transactions')
}
