const express = require("express");
const connectDB = require("./db");

const routes = require('./routes')
const authenticate = require("./middleware/authenticate");

const app = express();

app.use(express.json());
app.use(routes);

app.get("/health", (req, res) => {
  res.send("No Worries, Your site is in 100% health Condition");
});

app.get("/", (req, res) => {
  res.send(
    "<h1>Hello World</h1> <p> To check site health goto / health route</p > "
  );
});

//New Work through video



app.get("/public", (req, res) => {
  return res.json({ message: "I am public Route" });
});


app.get("/private", authenticate, (req, res) => {
     //Since we added user (req.user) property in authenticate function we can call this prop now
    console.log("I am the User: ", req.user)
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
