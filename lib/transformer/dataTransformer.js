// lib/transformer/dataTransformer.js
const jsonata = require('jsonata');

/**
 * Transforms data using a JSONata expression.
 *
 * @param {object} data - The data to be transformed.
 * @param {string} expression - The JSONata expression for data transformation.
 * @returns {Promise<any>} - A promise that resolves with the transformed data.
 * @throws {Error} - Throws an error if the transformation fails.
 */
async function transformData(data, expression) {
    try {
        const transformed = jsonata(expression).evaluate(data);
        return transformed;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    transformData,
};