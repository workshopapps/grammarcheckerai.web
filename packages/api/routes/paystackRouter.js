const { response } = require("express");
const request = require("request");
const Subscription = require("../database/models/subscriptionSchema");
const { initializePayment, verifyPayment } = require("../controller/paystack")(
	request
);
// const Subscription = require("../database/models/subscriptionSchema");
paystackRouter = require("express").Router();

paystackRouter.get("/", async (req, res) => {
	const subscriptions = await Subscription.find();
	return res.status(200).send({ status: "ok", data: subscriptions });
});

paystackRouter.post("/pay", async (req, res) => {
	const form = req.body;
	const params = JSON.stringify({
		email: form.email,
		amount: form.amount,
		plan: form.subscriptionId,
	});
	console.log(form);
	form.metadata = {
		full_name: form.name,
	};
	form.amount *= 100;

	initializePayment(form, params, async (error, body) => {
		if (error) {
			//handle errors
			console.log(error);
			return res
				.status(400)
				.send({ success: false, message: "Something went wrong" });
		}
		var response = JSON.parse(body);
		// await Subscription.create({email: form.email, subscriptionId: form.subscriptionId,  amount:form.amount, paymentGateway: 'paystack', txref: response.data.reference})
		console.log(response);
		res.redirect(response.data.authorization_url);
	});
});

paystackRouter.get("/verify", async (req, res) => {
	const { ref } = req.body;
	verifyPayment(ref, async (error, body) => {
		if (error) {
			console.log(error);
			return res
				.status(400)
				.send({ success: false, message: "Something went wrong" });
		}
		var response = JSON.parse(body);
		const updateStatus = await Subscription.findOne({
			txref: response.data.reference,
		});
		await Subscription.findByIdAndUpdate(updateStatus._id, {
			txref: response.data.status,
		});
		const data = response.data;
		res.status(200).send({ success: true, data });
	});
});

module.exports = paystackRouter;

// const request = require("request");
// const { initializePayment, verifyPayment } = require("../controller/paystack")(
//   request
// );
// const Subscription = require("../database/models/subscriptionSchema");
// paystackRouter = require("express").Router();

// paystackRouter.get("/", async (req, res) => {
//   const subscriptions = await Subscription.find();
//   return res.status(200).send({ status: "ok", data: subscriptions });
// });

// paystackRouter.post("/pay", (req, res) => {
//   const form = req.body;
//   const params = JSON.stringify({
//     email: form.email,
//     amount: form.amount,
//     plan: form.subscriptionId,
//   });
//   console.log(form);
//   form.metadata = {
//     full_name: form.name,
//   };
//   form.amount *= 100;

//   initializePayment(form, params, (error, body) => {
//     if (error) {
//       //handle errors
//       console.log(error);
//       return res
//         .status(400)
//         .send({ success: false, message: "Something went wrong" });
//     }
//     response = JSON.parse(body);
//     console.log(response);
//     res.redirect(response.data.authorization_url);
//   });
// });

// paystackRouter.get("/verify", (req, res) => {
//   const { ref } = req.body;
//   verifyPayment(ref, (error, body) => {
//     if (error) {
//       console.log(error);
//       return res
//         .status(400)
//         .send({ success: false, message: "Something went wrong" });
//     }
//     response = JSON.parse(body);
//     const data = response.data;
//     res.status(200).send({ success: true, data });
//   });
// });

// module.exports = paystackRouter;
