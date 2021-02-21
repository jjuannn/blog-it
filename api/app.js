require("dotenv").config({ path: "../.env" });
const express = require("express");

const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("api"));

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
