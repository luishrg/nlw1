import express from 'express'
import ItemsClass from './controllers/ItemsController'
import CollectionPointsClass from './controllers/CollecitonPointsController'

const routes = express.Router()

const ItemsController = new ItemsClass()
const CollecitonPointsController = new CollectionPointsClass()

routes.get('/items', ItemsController.list)

routes.post('/point', CollecitonPointsController.create)
routes.get('/points', CollecitonPointsController.list)
routes.get('/point/:pointId', CollecitonPointsController.detail)

export default routes