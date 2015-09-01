
import express from 'express'
import cors from 'cors'
import {createClient} from 'then-redis'

let app = express()
let redis = createClient('http://localhost:6379')

app.use(cors())
app.use('/api/top', (req, res) => {
  redis.get('top')
    .then(data => res.send(data))
})

app.listen(9000)
