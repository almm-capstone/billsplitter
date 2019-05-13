const express = require("express");
const ejs = require("ejs");
const paypal = require("paypal-rest-sdk");
const { FirebaseRef } = require("./src/lib/firebase");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AbVbICjXu68pgJSfe6lt9bpeRZGeEf-LMgNHqRua7kPjcrgcMtvGLZrvWRycoLXlDitztKTuHswpGchV",
  client_secret:
    "ED9DsHD_vhIG_hyjoKBTdycVQxSF06bUg02G45CfWTF-hz7oMEPAZ-Y4NVE7FweG1GRGyaillwL28ZGG"
});

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/pay", (req, res) => {
  console.log(req.body)
  let create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel"
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Product",
              sku: "001",
              price: "25.00",
              currency: "USD",
              quantity: 1
            }
          ]
        },
        amount: {
          currency: "USD",
          total: '$25.00',
        },
        description: "This is a product."
      }
    ]
  };

  paypal.payment.create(data, function(error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "25.00"
        }
      }
    ]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function(
    error,
    payment
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      FirebaseRef.child("/users/lesley@email/receipts").set({ 0: payment });
      res.render("success");
    }
  });
});

app.get("/cancel", (req, res) => res.render("cancel"));

app.listen(3000, () => {
  console.log("Server Started");
});
