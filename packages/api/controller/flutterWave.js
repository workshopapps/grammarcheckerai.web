const Flutterwave = require("flutterwave-node-v3");
require("dotenv").config();
// const axios = require("axios")
// const got = require("got");
const { response } = require("express");

const flw = new Flutterwave(
  "FLWPUBK_TEST-ab96bfc24d101b7af5933ca120fdb1a7-X",
  "FLWSECK_TEST-204488a850fd0dca39e00cfba88d40f6-X"
);

const createPaymentPlan = async () => {
  try {
    const payload = {
      amount: 500,
      name: "kelechi", //This is the name of the payment, it will appear on the subscription reminder emails
      interval: "monthly", //This will determine the frequency of the charges for this plan. Could be monthly, weekly, etc.
      duration: 24, //This is the frequency, it is numeric, e.g. if set to 5 and intervals is set to monthly you would be charged 5 months, and then the subscription stops
    };

    const response = await flw.PaymentPlan.create(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// createPaymentPlan();

const fetchSubscription = async () => {
  try {
    const response = await flw.Subscription.fetch_all();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// fetchSubscription();

const activateSubscription = async () => {
  try {
    const payload = {
      tx_ref: "MC-3243f",
      amount: 4,
      currency: "USD",
      redirect_url: "https://speakbetter.hng.tech",
      customer: { email: "ogmaro@yopmail.com" },
      payment_plan: 31036,
      email: "ogmaro@yopmail.com",
      card_number: "4556052704172643",
      enckey: "FLWSECK_TESTb780896f15ad",
      expiry_month: "01",
      expiry_year: "23",
      authorization: {
        mode: 'avs_noauth',
        city: "AMAC",
        address: "My Addess",
        state: "Abuja",
        country: "Nigeria",
        zipcode: 30001,
      },
    };
    const response = await flw.Charge.card(payload);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

activateSubscription();

// const token = 'FLWSECK_TEST-204488a850fd0dca39e00cfba88d40f6-X';

// const pay = async(req, res)=>{

//     try {
//         const response = await got.post("https://api.flutterwave.com/v3/payments", {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             json: {
//                 tx_ref: "hooli-tx-1920bbtytty",
//                 amount: "3000",
//                 currency: "NGN",
//                 redirect_url: "https://speakbetter.hng.tech/home",
//                 meta: {
//                     consumer_id: 23,
//                     consumer_mac: "92a3-912ba-1192a"
//                 },
//                 customer: {
//                     email: "khayceesdike@gmail.com",
//                     phonenumber: "07032044217",
//                     name: "Yemi Desola"
//                 },
//                 customizations: {
//                     title: "Speak Better Premium",
//                     logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
//                 }
//             }
//         }).json();
//     } catch (err) {
//         console.log(err);
//         console.log(err.code);
//         console.log(err.response);
//     }

// }

//  pay()

// const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`
// }

// const json =  {
//     tx_ref: "hooli-tx-1920bbtytty",
//     amount: "100",
//     currency: "NGN",
//     redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
//     meta: {
//         consumer_id: 23,
//         consumer_mac: "92a3-912ba-1192a"
//     },
//     customer: {
//         email: "khayceesdike@gmail.com",
//         phonenumber: "080****4528",
//         name: "Yemi Desola"
//     },
//     customizations: {
//         title: "Pied Piper Payments",
//         logo: "http://www.piedpiper.com/app/themes/joystick-v27/images/logo.png"
//     }
// }

//     const response = await got.post("https://api.flutterwave.com/v3/payments", {
//         headers: headers,
//         data: json
//     }).then((data)=>{
//       console.log(data);
//     })
//     .catch((error)=>{
//       console.log(error);
//     })
// }

// const flw = new Flutterwave("FLWPUBK_TEST-7e3146a9c1bf7af86f1e7a5cfeadefed-X", "FLWSECK_TEST-d9bca844bd11eba144a5430ba30d687d-X");
// const details = {
//     amount: 5000,
//     name: "Church collections plan",
//     interval: "monthly",
//     payment_plan: 31014,
// };
// flw.PaymentPlan.create(details)
//     .then(console.log)
//     .catch(console.log);

// const pay =  ()=>{
//     try {
//      const flw = new Flutterwave("FLWPUBK_TEST-7e3146a9c1bf7af86f1e7a5cfeadefed-X", "FLWSECK_TEST-d9bca844bd11eba144a5430ba30d687d-X");
//       const details = {
//        amount: 5000,
//        name: "Speak better",
//        interval: "monthly",
//        payment_plan: 31014,
// };
//  const result = flw.PaymentPlan.create(details)
// console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }

// pay()
