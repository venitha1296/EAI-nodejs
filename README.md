
# EAI-NODEJS SDK Documentation

## Overview

This SDK provides a RabbitMQ message processor, API adapter for fetching data with authentication, and a transformer for applying dynamic transformations to data using JSONata expressions. 

It enables easy integration with external APIs, processes RabbitMQ messages, and transforms data dynamically.

---

## Table of Contents

1. [Modules](#modules)
2. [Installation](#installation)
3. [API Reference](#api-reference)
   - [`getAuthToken(apiUrl, apiKey)`](#getauthtokenapiurl-apikey)
   - [`fetchData(apiUrl, token)`](#fetchdataapiurl-token)
   - [`transformData(data, expression)`](#transformdatadata-expression)
   - [`processMessage(message)`](#processmessagemessage)
   - [`startListener(rabbitMQUrl, queueName, handleMessage)`](#startlistenerrabbitmqul-queuename-handlemessage)
   - [`sendMessage(msg, config)`](#sendmessagemsg-config)

---

## Modules

### 1. Adapter Module (`/lib/adapter/apiAdapter.js`)

Handles authentication and data fetching from an API.

### 2. Queue Processor (`/lib/queue/processMessage.js`)

Processes the RabbitMQ messages by fetching data, transforming it, and further processing it.

### 3. RabbitMQ Listener (`/lib/queue/rabbitmqListener.js`)

Listens to RabbitMQ queues and triggers the message processing.

### 4. Data Transformer (`/lib/transformer/dataTransformer.js`)

Transforms data using dynamic JSONata expressions.

---

## Installation

To install this package, run:

```bash
npm install eai-sdk
```

---

## API Reference

### `getAuthToken(apiUrl, apiKey)`

Fetches an authentication token from the specified API URL using the provided API key.

**Parameters:**

- `apiUrl`: **String** - The URL of the API to authenticate against.
- `apiKey`: **String** - The API key used for authentication.

**Returns:**

- **Object** - The response object containing the token.

**Example:**

```javascript
const token = await getAuthToken('https://api.example.com/auth', 'your-api-key');
```

---

### `fetchData(apiUrl, token)`

Fetches data from the specified API URL using the provided token.

**Parameters:**

- `apiUrl`: **String** - The URL of the API to fetch data from.
- `token`: **String** - The authentication token.

**Returns:**

- **Object** - The data fetched from the API.

**Example:**

```javascript
const data = await fetchData('https://api.example.com/data', token);
```

---

### `transformData(data, expression)`

Transforms data using a JSONata expression.

**Parameters:**

- `data`: **Object** - The data to be transformed.
- `expression`: **String** - A JSONata expression used to transform the data.

**Returns:**

- **Object** - The transformed data.

**Example:**

```javascript
const transformedData = transformData(data, '$.name');
```

---

### `processMessage(message)`

Processes a RabbitMQ message by fetching data using the API adapter, transforming it, and logging the transformed data.

**Parameters:**

- `message`: **Object** - The message received from RabbitMQ containing the `apiKey`, `apiUrl`, and `transformationExpression`.

**Example:**

```javascript
const message = {
  apiKey: 'your-api-key',
  apiUrl: 'https://api.example.com/data',
  transformationExpression: '$.name'
};
await processMessage(message);
```

---

### `startListener(rabbitMQUrl, queueName, handleMessage)`

Starts a RabbitMQ listener that processes messages from the specified queue.

**Parameters:**

- `rabbitMQUrl`: **String** - The RabbitMQ server URL.
- `queueName`: **String** - The name of the queue to listen to.
- `handleMessage`: **Function** - A callback function to process each message.

**Example:**

```javascript
startListener('amqp://localhost', 'my_queue', processMessage);
```

---

### `sendMessage(msg, config)`

Sends a message to a specified RabbitMQ queue.

**Parameters:**

- `msg`: **Object** - The message to send.
- `config`: **Object** - Configuration object containing `url` (RabbitMQ server URL) and `outputQueue` (the queue name).

**Returns:**

- **Promise** - Resolves when the message is successfully sent.

**Example:**

```javascript
const config = {
  url: 'amqp://localhost',
  outputQueue: 'output_queue'
};

const message = { key: 'value' };

await sendMessage(message, config);
```

---

## Error Handling

Each module includes basic error handling, ensuring that errors encountered during API requests, message processing, or message sending are caught and logged.

**Example:**

```javascript
try {
    const token = await getAuthToken(apiUrl, apiKey);
} catch (error) {
    console.error('Failed to fetch auth token:', error);
}
```

---

This documentation outlines how to use each component of the library, with examples for setting up RabbitMQ listeners, fetching API data, transforming it, and pushing messages back to RabbitMQ.