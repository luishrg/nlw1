import { Request, Response } from 'express'
import knex from '../database/connection'
import { HttpError } from '../interfaces/ErrorInterfaces'

class CollectionPointsController {
    async list(request: Request, response: Response) {
        const { city, uf, items } = request.query
        const parsedItems = String(items).split(',').map(item => Number(item.trim()))

        const points = await knex('collection_points')
            .join('collection_point_items', 'collection_points.id', '=', 'collection_point_items.collection_point_id')
            .whereIn('collection_point_items.item_id', parsedItems)
            .where('address_city', String(city))
            .where('address_uf', String(uf))
            .distinct()
            .select('collection_points.*')

        return response.status(200).json({ collection_points: points })
    }

    async create(request: Request, response: Response) {
        try {
            const transaction = await knex.transaction()
            const { body: form } = request
            const collection_point = {
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                name: form.name,
                email: form.email,
                phone: form.phone,
                has_whatsapp: form.has_whatsapp,
                latitude: form.latitude,
                longitude: form.longitude,
                address_number: form.address_number,
                address_city: form.address_city,
                address_uf: form.address_uf
            }
            const createdId = await transaction('collection_points').insert(collection_point)
            const items = form.items.map((id: number) => {
                return {
                    item_id: id,
                    collection_point_id: createdId[0]
                }
            })
            await transaction('collection_point_items').insert(items)
            await transaction.commit()
            return response.status(201).json({ ...collection_point, id: createdId[0] })
        } catch (err) {
            const error: HttpError = {
                error: true,
                message: 'Falha ao salvar ponto de coleta!',
                _debug: err
            }
            return response.status(500).json(error)
        }
    }

    async detail(request: Request, response: Response) {
        const collection_point = await knex('collection_points').where('id', request.params.pointId).first()
        if (!collection_point) {
            const error: HttpError = {
                error: true,
                message: 'Ponto de coleta não encontrado!'
            }
            return response.status(400).json(error)
        }
        const items = await knex('items')
            .join('collection_point_items', 'items.id', '=', 'collection_point_items.item_id')
            .where('collection_point_items.collection_point_id', request.params.pointId)
            .select('items.title')

        return response.status(200).json({ collection_point, items })
    }
}

export default CollectionPointsController