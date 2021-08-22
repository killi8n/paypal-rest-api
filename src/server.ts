import express from 'express'
import routes from './routes'

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/api/v1', routes)

app.listen(4000, () => {
    console.log('server is listening on port 4000')
})