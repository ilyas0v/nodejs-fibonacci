import rabbitmqClient from '~/libs/rabbitmqClient'

const QUEUE_NAME = 'fibonacci-queue'

export const publishMessage = async (message: string) => {
    console.log('Message sending...')
    try {
        const channel = await rabbitmqClient()
        await channel.assertQueue(QUEUE_NAME)
        channel.sendToQueue(QUEUE_NAME, Buffer.from(message))
        console.log('Message sent...')
    } catch (err) {
        console.error(err)
    }
}
