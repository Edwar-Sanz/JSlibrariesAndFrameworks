import express from "express";
import config from "./src/configs/appConfig.js";
import routes from "./src/routes/routes.js";

//-------------------------------------------------------------
const app = express();
app.use("/", routes);
app.set("port", config.app.port);

//-------------------------------------------------------------
app.listen(app.get("port"), ()=> {
  console.log("servidor en el puerto: ", app.get("port"));
});