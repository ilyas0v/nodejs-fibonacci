import { Channel, ConsumeMessage } from 'amqplib'
import redisClient from '~/libs/redisClient'
import calculateFibonacci from '~/utils/calculateFibonacci'

const fibonacciListener = async (message: ConsumeMessage | null, channel: Channel) => {
    const input = JSON.parse(message?.content.toString() || '')
    if (!message) return

    const { ticket, number } = input

    const calculatedFibonacci = calculateFibonacci(number)

    console.log({ calculatedFibonacci })

    await redisClient.set(ticket, calculatedFibonacci)
    return channel.ack(message)
}

export default fibonacciListener
