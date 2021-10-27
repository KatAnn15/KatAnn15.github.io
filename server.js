const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios").default;
const https = require("https");
const formidableMiddleware = require("express-formidable");

const port = process.env.PORT || 4000;

const appMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

const urlEncoded = express.urlencoded({ extended: true });

app.use(
  express.static(__dirname + "/dist"),
  appMiddleware,
  urlEncoded,
  express.json(),
  formidableMiddleware()
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.listen(port);

//stripe integration
const stripeSecretKey =
  "sk_test_51JcASVF2J19ETIqFPiHxTkPrR6De6I6Eme95gjz86xKW3ZoluUOpgwyi1xuoTzOSU5J1eT7Xmdrh2FVQZ8yevWSP008AcItihp";
const stripe = require("stripe")(stripeSecretKey);
const DOMAIN = "https://prototype-part.herokuapp.com/#/stripe-thank-you-page";

app.post("/create-checkout-session", async (req, res) => {
  try {
    const planData = req.fields;
    const product = await stripe.products.create({
      name: planData.plan,
    });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: +planData.price * 100,
      currency: "usd",
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: planData.email,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${DOMAIN}?success=true`,
      cancel_url: `${DOMAIN}?canceled=true`,
    });
    res.send(session);
  } catch (err) {
    res.send(err);
  }
});

//----------countries list

app.get("/countries", async (req, res) => {
  try {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      requestCert: true,
    });
    const request = await axios.get("https://api.first.org/data/v1/countries", {
      httpsAgent: httpsAgent,
    });
    const data = await request.data;
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});
