// lib/queue/processMessage.js
const { getAuthToken, fetchData } = require("../adapter/apiAdapter");
const { transformData } = require("../transformer/dataTransformer");

/**
 * Asynchronously processes a message by fetching data, transforming it, and logging the result.
 *
 * @param {Object} message - The input message object containing necessary details.
 * @param {string} message.token - The token key used for authentication.
 * @param {string} message.apiUrl - The URL for fetching data after authentication.
 * @param {string} message.transformationExpression - A JSONata expression used for transforming the fetched data.
 *
 * @throws {Error} If any step in the process fails (authentication, data fetching, transformation).
 */

async function processMessage(message) {
  const { token, apiUrl, transformationExpression } = message;

  try {
    const data = await fetchData(apiUrl, token);

    //  Transform data using JSONata expression
    const transformedData = await transformData(data, transformationExpression);

    console.log("Processed Data:", transformedData);

    // Further processing logic can be added here
  } catch (error) {
    console.error("Message processing failed:", error);
    throw new Error(error);
  }
}

module.exports = processMessage;
