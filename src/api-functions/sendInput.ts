import { Request, Response } from 'express'
import generateRandomToken from '~/utils/generateRandomToken'
import { publishMessage } from '~/workers/publisher'

const sendInput = async (req: Request, res: Response) => {
    const number = Number(req.body.number)
    const ticket = generateRandomToken()
    if (number < 0) return res.status(400).json({ message: 'Invalid input' })

    const message = JSON.stringify({ ticket, number })
    publishMessage(message)

    return res.json({
        ticket,
    })
}

export default sendInput
