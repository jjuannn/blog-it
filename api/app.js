require("dotenv").config({ path: "../.env" });
const express = require("express");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("api"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const configureDI = require("./config/di.js");
const container = configureDI.configureContainer();

const expSession = container.get("session");
app.use(expSession);

const { initUserModule } = require("./module/user/module.js");
initUserModule(app, container);

const mainDb = container.get("Sequelize");
mainDb.sync();

app.get("/", (req, res) => {
  console.log(process.env.DB_PATH);
  res.send("working");
});

const PORT = 8080;
app.listen(
  process.env.PORT || PORT,
  console.log(`backend listening at port ${PORT}`)
);
