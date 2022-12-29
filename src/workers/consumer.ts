import { ConsumeMessage } from 'amqplib'
import rabbitmqClient from '~/libs/rabbitmqClient'
import fibonacciListener from '~/listeners/fibonacciListener'

const QUEUE_NAME = 'fibonacci-queue'

const consume = async () => {
    console.log(`Connecting to ${QUEUE_NAME}`)
    try {
        const channel = await rabbitmqClient()
        await channel.assertQueue(QUEUE_NAME)
        channel.consume(QUEUE_NAME, (message: ConsumeMessage | null) =>
            fibonacciListener(message, channel),
        )
        console.log(`Connected to ${QUEUE_NAME}`)
    } catch (err) {
        console.error('ERRROR', err)
        setTimeout(() => {
            consume()
        }, 3000)
    }
}
consume()
