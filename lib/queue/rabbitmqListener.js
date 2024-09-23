// lib/queue/rabbitmqListener.js
const amqp = require('amqplib');
// const processMessage = require('./processMessage');

/**
 * Asynchronously starts a RabbitMQ listener that consumes messages from a specified queue.
 *
 * @param {string} rabbitMQUrl - The connection URL for the RabbitMQ server.
 * @param {string} queueName - The name of the queue from which messages will be consumed.
 * @param {Function} handleMessage - A function that processes the consumed messages. 
 *        It should accept a message object as a parameter and return a Promise.
 *
 * @throws {Error} If any step in the process of connecting to RabbitMQ, creating the channel, 
 *         asserting the queue, or consuming messages fails.
 */
async function startListener(rabbitMQUrl, queueName, handleMessage) {
    try {
        const connection = await amqp.connect(rabbitMQUrl);
        const channel = await connection.createChannel();

        await channel.assertQueue(queueName, { durable: true });
        console.log(`Waiting for messages in ${queueName}...`);

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const message = JSON.parse(msg.content.toString());
                await handleMessage(message);
                channel.ack(msg);
            }
        });
    } catch (error) {
        console.error('RabbitMQ Listener Error:', error);
        throw new Error(error);
    }
}

module.exports = {
    startListener,
};
