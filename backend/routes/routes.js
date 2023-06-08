const express = require("express");
const routes = express.Router();
const {
  regUser,
  loginUser,
  checkEmail,
  detalleFigus,
  insertaPartida,
  detalleAlbums,
  usuarioId,
  detalleUsuarios,
  meFaltan,
  lasRepe,
  laTengo,
  suma,
  resta,
  nuevaPartida,
} = require("../controllers/Controllers");

// const { runValidation } = require("../middlewares/validators/index");
// const { verifyToken } = require("../middlewares/auth/auth");

routes.post("/register", regUser);
routes.post("/login", loginUser);
routes.post("/checkemail", checkEmail);
routes.get("/detfigus",detalleFigus);
routes.post("/partida", insertaPartida);
routes.post("/nuevapartida", nuevaPartida);
routes.get("/albums", detalleAlbums);
routes.get("/nola", meFaltan);
routes.get("/lasrepe", lasRepe);
routes.put("/figuritas/:id", laTengo);
routes.put("/suma/:id", suma);
routes.put("/resta/:id", resta);
routes.get("/usuarios/:email", usuarioId);
routes.get("/usuarios", detalleUsuarios);




module.exports = routes;
