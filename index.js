const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5001;
const app = express();
const multer = require("multer");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const SignUp = require("./routes/Signup");
const Login = require("./routes/Login");
const Auth = require("./routes/Auth");
const path = require("path");
const { model, connect } = require("./connect");
connect();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());



app.get("/", async (req, resp) => {
 resp.send({data:"hello"})
});

app.post("/signup", SignUp.signup);
app.post("/login", Login.login);



app.get("/auth/userinformation", Auth.Auth, (req, resp) => {
  if (!req.user) {
    resp.status(401).send({ message: "false" });
    return;
  }
  resp.status(200).send(req.user);
});





app.listen(port, (err) => {
  if (!err) console.log("backend server started at ", port);
});
