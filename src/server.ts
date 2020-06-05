import express from 'express'
import routes from './routes'
import { json } from 'body-parser'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(json())
app.use(cors())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.listen(8888)