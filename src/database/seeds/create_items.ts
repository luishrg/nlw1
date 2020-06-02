import Knex from 'knex'

export async function seed(knex: Knex){
    return await knex('items').insert([
        {title: 'Lâmpadas', image: 'lamp.svg'},
        {title: 'Pilhas e Baterias', image: 'batery.svg'},
        {title: 'Papéis e Papelões', image: 'paper.svg'},
        {title: 'Resíduos Eletrônicos', image: 'electronic.svg'},
        {title: 'Resíduos Orgânicos', image: 'organic.svg'},
        {title: 'Óleo de Cozinha', image: 'oil.svg'},
    ])
}