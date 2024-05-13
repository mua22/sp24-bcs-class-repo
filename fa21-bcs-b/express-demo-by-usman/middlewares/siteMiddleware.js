module.exports = async function (req, res, next) {
  //in development set default user
  //   let User = require("../models/user");
  //   let user = await User.findOne({ email: "hassan@gmail.com" });
  //   req.session.user = user;
  // comment above code to avoid default user login
  res.flash = function (type, message) {
    req.session.flash = { type, message };
  };
  res.locals.flash = req.session.flash;
  req.session.flash = null;

  res.locals.user = req.session.user;
  next();
};
