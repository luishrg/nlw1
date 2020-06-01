import express from 'express'

const app = express()


app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Bem vindo a api Ecoleta!'
    })
})

app.listen(8888)