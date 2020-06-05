import Knex from 'knex'

export function up(knex: Knex){
    return knex.schema.createTable('collection_points', table => {
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('name', 30).notNullable()
        table.string('email').notNullable()
        table.string('phone').notNullable()
        table.boolean('has_whatsapp').defaultTo(false)
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('address_number').notNullable()
        table.string('address_city').notNullable()
        table.string('address_uf').notNullable()
        table.timestamps(true, true)
    })
}

export function down(knex: Knex){
    return knex.schema.dropTable('collection_points')
}