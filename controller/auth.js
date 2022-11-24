const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/User')


const registerController = async (req, res, next) => {
  /**
    ** Request Input Sources
    - req Body
    - req param
    - req header
    - req Query
    - req Cookies
    **/
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Invalid Data Entered");
  }

  try {
    //User.findOne({email: email})
    let user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "User already exists" });
    }
    user = new User({ name, email, password });

    //    hashing password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    user.password = hashed;

    //    saving to DB
    await user.save();
    res
      .status(201)
      .json({ message: "User created & saved Successfully", user });
  } catch (err) {
    next(err);
  }
};



const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username" });
    }
    const isMatched = await bcrypt.compare(password, user._doc.password);
    if (!isMatched) {
      return res.status(400).json({ msg: "Invalid Credential" });
    }
    //        findOne method only pass reference of a obj. Whole object lives in "_doc" property. thats why we have to use "user._doc"......
    delete user._doc.password;

    //TODO generate and return JWT
    const token = jwt.sign(user._doc, "secret-key", { expiresIn: "2h" });
    return res.status(200).json({ message: "Login Successful", token });
  } catch (e) {
    next(e);
  }
};



module.exports = {
    registerController,
    loginController
};