import { createClient } from 'redis'

const CONNECT_URL = process.env.REDIS_CONNECT_URL
const redisClient = createClient({ url: CONNECT_URL })

const connectRedis = async () => {
    await redisClient.connect()
}
connectRedis()

redisClient
    .on('error', (err) => console.error('Redis Client Error', err))
    .on('connect', (a) => console.log('Redis Connected'))

export default redisClient
