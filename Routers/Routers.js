const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const hbs = require("hbs");

//require controlers
const {
  UserRegistration,
  UserLogin,
} = require("../Controllers/LoginRegistration/LoginRegistration");

const {
  StripePaymentController,
  StripePaymentGatsbyController,
  StripePaymentWithNode,
  GetStripeNodePaymentInfo,
  StripeCuntomers,
  GetCustomerById,
} = require("../Controllers/StripePaymentIntegration/StripePayment");

const {
  PaypalPaymentController,
  PaypalPaymentSuccess,
} = require("../Controllers/PaypalPayment/PaypalPaymentIntegration");

const {
  WybritUserRegistration,
  WybritUserLogin,
  Wybritorders,
  WybritGetorders,
} = require("../Controllers/WybritController/wybrituserregistration");

//routes 

const static_path = path.join(__dirname, "../Public");
app.use(express.static(static_path));

const views_path = path.join(__dirname, "../views/pages");
const partial_path = path.join(__dirname, "../views/templates");
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partial_path);

//render signup signin form
router.get("/", (req, res) => {
  try {
    res.render("pages/index.hbs");
  } catch (error) {
    res.json({ error });
  }
});

router.get("/signup", (req, res) => {
  res.render("pages/index.hbs");
});

router.get("/login", (req, res) => {
  res.render("pages/login.hbs");
});
//render home page
router.get("/home", (req, res) => {
  res.render("pages/home.hbs");
});
//render product details page
router.get("/products/product_details/:id", (req, res) => {
  res.render("pages/product_details.hbs");
});
//render checkout page
router.get("/checkout", (req, res) => {
  res.render("pages/checkout.hbs");
});

router.post("/", UserRegistration);
router.post("/login", UserLogin);

////################################# ****stripe payment gateway integration****###########################################//
//stripe node
router.post("/create-checkout-session", StripePaymentWithNode);
router.get("/success", GetStripeNodePaymentInfo);

//stripe payment gateway for reactjs api
router.post("/stripe-payment-integration", StripePaymentController);

//stripe payment gateway for gatsbyjs api
router.post(
  "/stripe-payment-integration-gatsby",
  StripePaymentGatsbyController
);

//stripe retreive all customers
router.get("/stripeallcuntomers", StripeCuntomers);

//stripe individual customer retreive  customer by id
router.get("/stripecuntomer/:cust_id", GetCustomerById);

// // ------------------------   paypal payment gateway  ----------------------------------
router.post("/paypal-payment-integration", PaypalPaymentController);
router.get("/success", PaypalPaymentSuccess);
router.get("/paypal-cancel", (req, res) => {
  res.send("cancelled");
});

//wybrit app api login regfistration
router.post("/wybrituserregistration", WybritUserRegistration);
router.post("/wybrituserlogin", WybritUserLogin);
router.post("/wybritorders", Wybritorders);
router.post("/wybritgetorders", WybritGetorders);

module.exports = router;
