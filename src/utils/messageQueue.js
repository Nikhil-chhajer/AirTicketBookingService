const amqplib = require('amqplib');
const{EXCHANGE_NAME,MESSAGE_BROKER_URL}=require('../config/serverConfig')
const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        //message broker url(rabbit mq) will be passed, this message broker maintain multiple queue
        const channel = await connection.createChannel();
        //this will create the channel
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        //this will distribute all messages between the queue(becoz we can maintain multiple queue) depending on certain configuration
        return channel;

    } catch (error) {

        throw error;

    }

}
const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const applicationQueue = await channel.assertQueue('REMAINDER_QUEUE');
        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);
        channel.consume(applicationQueue.queue, msg => {
            console.log('received data');
            console.log(msg.content.toString());
            channel.ack(msg);
        });

    } catch (error) {
        throw error;
    }

}
const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue('REMAINDER_QUEUE');
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;

    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}