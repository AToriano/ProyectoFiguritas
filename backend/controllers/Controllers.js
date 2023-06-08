const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.regUser = async (req, res) => {
  const { password, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypt = await bcrypt.hash(password, salt);
  try {
    const resultado = await knex("usuarios").insert({
      password: passwordEncrypt,
      email: email,
    });
    res.status(200).json({ message: "Se ha registrado el usuario" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.checkEmail = async (req, res) => {
  const { email } = req.body;
  knex("usuarios")
    .where({ email: email })
    .then((resultado) => {
      if (!resultado.length) {
       res.status(200).json({
          message: "Email disponible para registro",
          email
        });
      } 
      else{
        res.status(400).json({message: "El email no está disponible"})
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
await knex("usuarios")
    .where({ email: email })
    .then(async (resultado) => {
      if (!resultado.length) {
        res.status(404).json({ error: "El mail no se encuentra registrado" });
        return;
      }
      const validatePassword = await bcrypt.compare(
        password,
        resultado[0].password
      );
      if (!validatePassword) {
        res.status(400).json({
          error: "Usuario y/o contraseña inválido",
        });
        return;
      }

      const token = jwt.sign(
        {
          email: resultado[0].email,
        },
        process.env.TOKEN_SECRET
      );
      res.status(200).json({
        message: "El usuario se ha logeado correctamente",
        token: token,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
};

exports.detalleAlbums = async (req, res) => {
  try {
    const resultado = await knex.select("*").from("albums");
    res.status(200).json({ albums: resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.detalleUsuarios = async (req, res) => {
  
  try {
    const resultado = await knex.select("*").from("usuarios");
    res.status(200).json({ usuarios: resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.usuarioId = async (req, res) => {
const {email}=req.params;
try {
  const idusuario = await knex("usuarios")
  .select(
    "id"
  )
  .where({email, email});
  res.status(200).json({idusuario});
} catch (error) {
  res.status(500).json({ error: "Internal server error" });
}
};


exports.detalleFigus = async (req, res) => {
  try {
    const resultado = await knex("partidas")
      .select(
        "figurita_id as id",
        "figuritas.nombre as nombre",
        "figuritas.equipo as equipo",
        "figuritas.imagen as imagen",
        "tengo",
        "cantidad"
      )
      .innerJoin(
        "figuritas",
        "figurita_id",
        "=",
        "figuritas.id"
      );
    const figus = resultado.map((figurita) => {
      const color = figurita.tengo ? "color-normal" : "color-gris";
      const addButton = figurita.tengo
        ? ""
        : `<button class="add-button" data-id="${figurita.id}">Add</button>`;
      const cantidad = figurita.tengo
        ? `<span class="cantidad"> ${figurita.cantidad}</span>`
        : "";
      return { ...figurita, color, addButton, cantidad };
    });
    res.status(200).json({ figus: resultado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.insertaPartida = async (req, res) => {
  try {
    await knex.raw(`
      INSERT INTO partidas (usuario_id, album_id, figurita_id, tengo, cantidad)
      SELECT 1, figuritas.album_id, figuritas.id, false, 0
      FROM figuritas;
    `);

    res.status(200).json({ message: 'Se ha creado la partida' });
  } catch (error) {
    console.error('Error al insertar partidas:', error);
    res.status(500).json({ message: 'Error al insertar partidas' });
  }
};
exports.nuevaPartida =async (req,res) => {
const{usuario_id, album_id}=req.body;
try{
  await knex.raw(`
      INSERT INTO partidas (usuario_id, album_id, figurita_id, tengo, cantidad)
      SELECT :usuario_id, :album_id, figuritas.id, false, 0
      FROM figuritas;
    `, {usuario_id, album_id});

    res.status(200).json({ message: 'Se ha creado la partida' });
  } catch (error) {
    console.error('Error al insertar partidas:', error);
    res.status(500).json({ message: 'Error al insertar partidas' });
  }
};

exports.meFaltan = async (req, res) => {
  try {
    const resultado = await knex("partidas")
      .select(
        "figurita_id as id",
        "figuritas.nombre as nombre",
        "figuritas.equipo as equipo",
        "figuritas.imagen as imagen",
        "tengo",
        "cantidad"
      )
      .innerJoin(
        "figuritas",
        "figurita_id",
        "=",
        "figuritas.id"
      )
      .where("tengo", false);
      res.status(200).json({ figus: resultado });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.lasRepe = async (req, res) => {
    try {
      const resultado = await knex("partidas")
        .select(
          "figurita_id as id",
          "figuritas.nombre as nombre",
          "figuritas.equipo as equipo",
          "figuritas.imagen as imagen",
          "tengo",
          "cantidad"
        )
        .innerJoin(
          "figuritas",
          "figurita_id",
          "=",
          "figuritas.id"
        )
        .where("partidas.cantidad", ">", 1);
        res.status(200).json({ figus: resultado });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };

    exports.laTengo = async (req, res) => {
      const {id } = req.params;
      try {
        const figus = await knex("partidas")
          .select( "tengo", "cantidad")
          .where({ figurita_id : id })
          .first()
        if (!figus) {
          return res.status(404).json({ error: "No encontrada" });
        }
        if (figus.tengo) {
          return res.status(400).json({ error: "Ya la tienes" });
        }
        await knex("partidas")
          .where({ figurita_id : id})
          .update({ tengo: true, cantidad: 1 });
        res.status(200).json({ message: "Se actualizó" });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    };

    exports.suma = async (req, res) => {
      const { id } = req.params;
      try {
        const figus = await knex("partidas")
          .select("cantidad")
          .where({ figurita_id : id })
          .first();
        if (!figus) {
          return res.status(404).json({ error: "No encontrada" });
        }
        const masUno = figus.cantidad + 1;
        await knex("partidas")
          .where({ figurita_id : id })
          .update({ cantidad: masUno });
        res.status(200).json({ message: "Se actualizó" });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    };
    exports.resta = async (req, res) => {
      const { id } = req.params;
      try {
        const figus = await knex("partidas")
          .select("cantidad")
          .where({ figurita_id : id })
          .first();
        if (!figus) {
          return res.status(404).json({ error: "No encontrada" });
        }
        const menosUno = figus.cantidad - 1;
        await knex("partidas")
          .where({ figurita_id : id })
          .update({ cantidad: menosUno });
        res.status(200).json({ message: "Se actualizó" });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    };