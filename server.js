const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("./middleware/authenticate");

const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send("No Worries, Your site is in 100% health Condition");
});

app.get("/", (req, res) => {
  res.send(
    "<h1>Hello World</h1> <p>To check site health goto /health route</p>"
  );
});

//New Work through video
app.post("/register", async (req, res, next) => {
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
});


app.post("/login", async (req, res, next) => {
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
});


app.get("/public", (req, res) => {
  return res.json({ message: "I am public Route" });
});


app.get("/private", authenticate, (req, res) => {
     //Since we added user (req.user) property in authenticate function we can call this prop now
    console.log("I am the User ===> ", req.user)
     return res.status(200).json({
       message: "I am a private route with authorization",
     });
});


app.use((err, req, res) => {
  console.log(err);
  const message = err.message ? err.message : "Server error Occurred";
  const status = err.status ? err.status : 500;
  res.status(status).json({ message });
});

connectDB("mongodb://127.0.0.1:27017/attendance-system")
  .then(() => {
    console.log("Database Connected");
    app.listen(4000, () => console.log("I am listening at PORT 4000"));
  })
  .catch((err) => {
    console.log(err);
  });
