// lib/adapter/apiAdapter.js
const axios = require('axios');

/**
 * Fetches an authentication token from the API.
 *
 * @param {string} apiUrl - The URL of the API endpoint for authentication.
 * @param {string} apiKey - The API key for authentication.
 * @returns {Promise<any>} - A promise that resolves with the API response.
 * @throws {Error} - Throws an error if the authentication fails.
 */
async function getAuthToken(apiUrl, apiKey) {
  try {
    const response = await axios.post(apiUrl, { apiKey });
    return response;
  } catch (error) {
    throw new Error("Failed to fetch auth token");
  }
}

/**
 * Fetches data from the specified API endpoint using an authentication token.
 *
 * @param {string} apiUrl - The URL of the API endpoint to fetch data from.
 * @param {string} token - The authentication token to use for the request.
 * @returns {Promise<any>} - A promise that resolves with the fetched data.
 * @throws {Error} - Throws an error if the request fails or if the token is invalid.
 */
async function fetchData(apiUrl, token) {
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAuthToken,
    fetchData,
};
