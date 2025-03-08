require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const app = express();
const userController = require("./controller/user");
const authenticationController =  require ("./controller/authentication")
async function bootstrap(argument) {
  //Step1: Connect DB
  await connectDB();

  //Step2: Middleware
  app.use(cors());
  app.use(bodyParser.json());

  //Step3: Router
  app.get("/", (req, res) => {
    res.send("Welcome API");
  });
  
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({ message: "invalidJSONData" });
    }
    next();
  });

  app.use("/api/v1/authentication", authenticationController);

  app.use("/api/v1/users", userController);

  //Step4: Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server env ${argument}`);
    console.log(`🚀 Server run http://localhost:${PORT}`);
  });
  
}

bootstrap(process.env.ENV);
