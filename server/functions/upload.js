/* eslint-disable no-undef */
exports.handler = async (event) => {
    const body = JSON.parse(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Received: ${body.name}` }),
    };
  };
