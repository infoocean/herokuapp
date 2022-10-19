//require models
const registration = require("../../Models/registration");

// user registration routes
const UserRegistration = async (req, res) => {
  //console.log("register data");
  //console.log(req.body);
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  if (password !== confirm_password) {
    res.json("paswaord or conform pasword not match");
  }
  const data = new registration({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
    gender: req.body.gender,
    number: req.body.number,
    dateofbirth: req.body.dateofbirth,
    applyasa: req.body.applyasa,
  });
  //console.log(data);
  try {
    const savedata = await data.save();
    //console.log(savedata);
    //res.status(201).send({ message: "data save successfully", savedata });
    res.render("pages/login.hbs");
  } catch (error) {
    //console.log(error);
    res.status(400).send({ message: error.message });
  }
};

//user login controller
const UserLogin = async (req, res) => {
  //console.log("lofin");
  //console.log(req.body);
  try {
    const email = req.body.email;
    const password = req.body.password;
    const isuser = await registration.findOne({
      email: email,
      password: password,
    });
    //console.log(isuser);
    if (isuser !== null) {
      res.render("pages/home.hbs");
    } else {
      res.send({ message: "please enter valid email or password" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = { UserRegistration, UserLogin };
