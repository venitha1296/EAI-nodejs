const amqp = require('amqplib');

/**
 * Sends a message to the specified output queue using AMQP.
 *
 * @param {Object} msg - The message to be sent.
 * @param {Object} config - The configuration object containing the AMQP connection details and output queue name.
 * @param {string} config.url - The URL of the AMQP server.
 * @param {string} config.pendingOrdersQueue - The name of the output queue.
 *
 * @returns {Promise<void>} - A promise that resolves when the message is sent successfully or rejects with an error.
 *
 * @example
 * const config = {
 *   url: 'amqp://localhost:5672',
 *   outputQueue: 'my_output_queue'
 * };
 *
 * const message = {
 *   key: 'value'
 * };
 *
 * sendOrderMessage(message, config)
 *   .then(() => console.log('Message sent successfully'))
 *   .catch(error => console.error('Error sending message:', error));
 */
async function sendOrderMessage(msg, config) {
    try {
        // Send transformed data to output queue
        const connection = await amqp.connect(config.url);
        console.log('Connected to AMQP server',config);
        const channel = await connection.createChannel();
        await channel.assertQueue(config.pendingOrdersQueue);
        // console.log("JSON.stringify(msg)", JSON.stringify(msg))
        channel.sendToQueue(config.pendingOrdersQueue, Buffer.from(JSON.stringify(msg)));

        console.log('Message processed and sent to orders queue');
        await channel.close();
        await connection.close();
        // return "success";
    } catch (error) {
        console.error('Error processing message:', error);
        // return error.message;
        throw new Error(error);
        
    }
}

module.exports = sendOrderMessage