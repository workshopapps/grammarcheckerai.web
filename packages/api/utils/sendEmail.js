const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const { environment } = require("../config/environment")
const fs = require("fs");
const path = require("path");


const sendEmail = async (email, subject, text) => {
    try {
    //Generate test SMTP service account from ethereal.email
    let testAccount = await nodemailer.createTestAccount()
  
        // Create a reusable transporter object 
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: true,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        //compile our email templates
        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);

        const options = () => {
            return {
              from: environment.FROM_EMAIL,
              to: email,
              subject: subject,
              html: compiledTemplate(text),
            };
        };
      
        // Send email
        transporter.sendMail(options(), (error, info) => {
        if (error) {
            return error;
        } else {
            return {
            success: true,
            };
        }
        });
    } catch (error) {
        return error;
    }
};
      

module.exports = sendEmail;