const SibApiV3Sdk = require("sib-api-v3-sdk");

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey =
  client.authentications["api-key"];

apiKey.apiKey =
  process.env.BREVO_API_KEY;

const apiInstance =
  new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async (
  to,
  subject,
  text
) => {

  try {

    await apiInstance.sendTransacEmail({

      sender: {
        email: "arpitkahalek13@gmail.com",
        name: "NewsPulse",
      },

      to: [
        {
          email: to,
        },
      ],

      subject: subject,

      textContent: text,

    });

    console.log(
      "Email Sent Successfully"
    );

  } catch (error) {

    console.log(
      "Brevo Email Error:",
      error.message
    );

  }
};

module.exports = sendEmail;