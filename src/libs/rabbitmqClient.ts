import amqp from 'amqplib'
const CONNECT_URL = process.env.RABBITMQ_CONNECT_URL || ''

const rabbitmqClient = async () => {
    const connection = await amqp.connect(CONNECT_URL)
    const channel = await connection.createChannel()
    return channel
}

export default rabbitmqClient
