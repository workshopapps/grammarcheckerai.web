/**
 * Returns response object
 * @param {string} message Response message
 * @param {*} data Data to be returned
 * @param {boolean} success Status of the request
 */
 const response = ({ success, message, data }) => {
    return {
        success: success == null ? true : success,
        message: formatMessage(message), 
        count: typeof data === 'object' ? data.length : undefined,
        data: data || undefined,
    };
};

const formatMessage = (str) => {
    if (!str) return '';
    // Make first letter capitial
    return str.charAt(0).toUpperCase() + str.slice(1);
};
module.exports = {response, formatMessage}