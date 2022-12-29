import { Request, Response } from 'express'
import redisClient from '~/libs/redisClient'

const getOutput = async (req: Request, res: Response) => {
    const ticket = (req.query.ticket || '').toString()
    const fibonacci = await redisClient.get(ticket)

    if (!fibonacci) return res.status(404).json({ message: 'Not found' })

    return res.json({
        fibonacci,
    })
}

export default getOutput
