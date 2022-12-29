import cluster from 'cluster'
import express from 'express'
import getOutput from './api-functions/getOutput'
import sendInput from './api-functions/sendInput'
import { cacheResponse } from './middlewares/cacheResponse'

const NUM_FORKS = 3

if (cluster.isPrimary) {
    for (let i = 0; i < NUM_FORKS; i++) cluster.fork()
} else {
    const app = express()
    app.use(express.json())
    app.post('/input', sendInput)
    app.get('/output', getOutput)

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`Development server started on ${PORT}, PID: ${process.pid}`)
    })
}
