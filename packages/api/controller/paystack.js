const {environment} = require("../config/environment");
const {PAYSTACK_SECRET_KEY} =  environment;


const verify = (request) => {
  const verifyPayment = (ref, mycallback) => {
    const option = {
      url : 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
            headers : {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
           }
      }
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(option, callback);
  };
  return { verifyPayment };
};
module.exports = verify;




