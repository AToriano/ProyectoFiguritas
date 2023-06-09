const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes/routes")


//creamos el servidor con express
const app = express();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// colocar rutas
app.use("/api", routes)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Servidor levantado en el puerto 8000");
});
