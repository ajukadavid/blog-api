const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: "us21",
});

export const register = async (req, res) => {
    try {
      const response = await client.lists.addListMember("4c6c36f732", {
        email_address: req.body.email,
        status: "subscribed",
        tags: "Member"
      });
          res.json({data: response})
    } catch (e) {
        res.json({e})
    }
}


