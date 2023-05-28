const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "50d10d253f8eda6da9da8b73d534ebc9-us21",
  server: "us21",
});

export const register = async (req, res) => {
    try {
        const response = await client.lists.addListMember("l4c6c36f732", {
            email_address: "Ebony_Brekke@gmail.com",
            status: "Subscribed",
          });
          console.log(response);
    } catch (e) {
        res.json({e})
    }
}
