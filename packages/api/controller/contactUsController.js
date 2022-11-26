const Contact = require("../database/models/contactUsSchema");

//contact us
async function contactUsController (req, res) {
  try {
    //create a new contact
    const contact = await Contact.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      message: req.body.message,
    });
    return res.status(201).json({
      pageTitle: "Contact Us",
      status: "Success",
      message: "Message Sent Successfully!",
      data: contact,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

module.exports = contactUsController