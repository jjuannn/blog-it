require("dotenv").config({ path: "../.env" });
const express = require("express");

const app = express();
const passport = require("passport")
app.use(passport.initialize())
app.use(passport.session())
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

app.get("/public/user_pictures?:img", (req, res) => {
  const filename = req.query.img
  const pathToFile = `${process.env.UPLOAD_MULTER_DIR}/${filename}`
  res.sendFile(pathToFile, {root: __dirname})
})


const PORT = 8080;
app.listen(
  process.env.PORT || PORT,
  console.log(`backend listening at port ${PORT}`)
);
