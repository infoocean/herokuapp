const paypal = require("paypal-rest-sdk");
paypal.configure({
  mode: "sandbox",
  client_id:
    "ATcEG98isGpJ-DLZxa5WvqHcMBzbJBpCSVEZyw9TpyAW6iaGiUu93H5uY928uNPcOTaBCvnKUDnw2pFO",
  client_secret:
    "EPh3-bhswI62ryax0NRrB-AQ3G924TtAQr-oAmJMd-l5FJT1XfWkw3e-b6-tC9oT3Q4O6qy-955e0jh8",
});

//paypal payment
const PaypalPaymentController = async (req, res) => {
  //console.log(req.body);
  const items = req.body;
  //ammount = items.product.price.toString();
  //console.log(items);
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:4000/success",
      cancel_url: "http://localhost:4000/paypal-cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: items.product.product_name,
              sku: "item",
              price: "1.00",
              currency: "USD",
              quantity: 1,
              description: items.product.description,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: items.product.description,
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      //console.log("Create Payment Response");
      //console.log(payment);
      for (var index = 0; index < payment.links.length; index++) {
        //Redirect user to this endpoint for redirect url
        if (payment.links[index].rel === "approval_url") {
          console.log(payment.links[index].href);
          res.send(payment.links[index].href);
        }
      }
    }
  });
};

const PaypalPaymentSuccess = async (req, res) => {
  const payer_id = req.query.PayerID;
  const paymentId = req.query.paymentId;

  var execute_payment_json = {
    payer_id: payer_id,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "1.00",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        //console.log("Get Payment Response");
        //console.log(JSON.stringify(payment));
        //res.send({ message: "done", data: payment });
        res.redirect("http://localhost:3000/products/success");
      }
    }
  );
};

module.exports = { PaypalPaymentController, PaypalPaymentSuccess };
