const sendGridMail = require('@sendgrid/mail');

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (options) => {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

    const mailOptions = {
        from: {
            from: "AKARTIS test email",
            email: process.env.EMAIL_FROM
        },
        to: options.to,
        // Send multiple emails
        // to: ['email1@gmail.com', 'email@gmail.com'],
        subject: options.subject,
        html: options.text
    }

    sendGridMail
        .send(mailOptions)
        .then((response) => console.log("Email form SendGrid sent ..."))
        .catch((error) => console.log("SendGrid " + error.message));
}

module.exports = sendEmail;