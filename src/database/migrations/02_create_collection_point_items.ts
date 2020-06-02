import Knex from 'knex'

export function up(knex: Knex){
    return knex.schema.createTable('collection_point_items', table => {
        table.increments('id').primary()

        table.integer('collection_point_id')
            .notNullable()
            .references('id')
            .inTable('collection_points')

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items')
    })
}

export function down(knex: Knex){
    return knex.schema.dropTable('collection_point_items')
}