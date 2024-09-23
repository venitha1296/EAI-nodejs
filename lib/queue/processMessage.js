// lib/queue/processMessage.js
const { getAuthToken, fetchData } = require("../adapter/apiAdapter");
const { transformData } = require("../transformer/dataTransformer");

/**
 * Asynchronously processes a message by fetching data, transforming it, and logging the result.
 *
 * @param {Object} message - The input message object containing necessary details.
 * @param {string} message.authApiUrl - The URL for the authentication API to retrieve a token.
 * @param {string} message.apiKey - The API key used for authentication.
 * @param {string} message.apiUrl - The URL for fetching data after authentication.
 * @param {string} message.transformationExpression - A JSONata expression used for transforming the fetched data.
 *
 * @throws {Error} If any step in the process fails (authentication, data fetching, transformation).
 */

async function processMessage(message) {
  const { authApiUrl, apiKey, apiUrl, transformationExpression } = message;

  try {
    // Step 1: Get token and fetch data
    const token = await getAuthToken(authApiUrl, apiKey);
    const data = await fetchData(apiUrl, token);

    // Step 2: Transform data using JSONata expression
    const transformedData = await transformData(data, transformationExpression);

    console.log("Processed Data:", transformedData);

    // Further processing logic can be added here
  } catch (error) {
    console.error("Message processing failed:", error);
    throw new Error(error);
  }
}

module.exports = processMessage;
