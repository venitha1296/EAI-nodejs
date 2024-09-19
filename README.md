# EAI-nodejs SDK

[![npm version](https://badge.fury.io/js/eai-nodejs.svg)](https://www.npmjs.com/package/eai-nodejs)

## Overview

The **EAI-nodejs SDK** is a flexible library that enables seamless RabbitMQ message processing. It comes with built-in functionalities for adapters, transformers, and custom RabbitMQ listeners, making it ideal for integrating with various message-based architectures and APIs.

## Features

- **RabbitMQ Listener**: Dynamically process and listen for RabbitMQ messages.
- **API Adapter**: Easily fetch data from an API with authentication support.
- **Data Transformation**: Transform message data with customizable transformers, including JSONata support.

## Installation

You can install this package using npm:

```bash
npm install eai-nodejs
```


## Usage
Here’s an example of how to use the SDK to listen for messages, process them through the adapter, and apply a data transformation.

```bash

const { RabbitMQProcessor } = require('EAI-nodejs');

// Initialize RabbitMQ processor
const processor = new RabbitMQProcessor({
  rabbitMqUrl: 'amqp://localhost', // RabbitMQ URL
  queue: 'my-queue-name'
});

// Define adapter logic to fetch data from an API
const adapter = async () => {
  const token = await processor.getAuthToken('your-api-key');
  return await processor.fetchData(token, 'https://api.example.com/data');
};

// Define transformer logic to transform the message data
const transformer = (data) => {
  const expression = '$.name';
  return processor.transformData(data, expression);
};

// Start listening and processing messages
processor.listen(adapter, transformer);

```


## Express API Integration
You can also integrate the SDK with an Express API to handle webhooks or other types of triggers:

```bash
const express = require('express');
const { RabbitMQProcessor } = require('rabbitmq-processor-sdk');

const app = express();
app.use(express.json());

const processor = new RabbitMQProcessor({
  rabbitMqUrl: 'amqp://localhost',
  queue: 'my-queue-name'
});

// Define a webhook route to trigger message processing
app.post('/webhook', async (req, res) => {
  const { data } = req.body;
  const transformedData = processor.transformData(data, '$.name');
  res.json({ transformedData });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

```
## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.