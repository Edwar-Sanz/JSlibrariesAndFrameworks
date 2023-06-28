const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const cors = require('cors');

//------------------------------------------------------------------------------------------
// Crear la instancia de Sequelize para la conexión a la base de datos
const sequelize = new Sequelize('logindb', 'root', '123456789', 
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);
//------------------------------------------------------------------------------------------
// Definir el modelo de Usuario
const UserModell = sequelize.define('Usersjwt', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
//------------------------------------------------------------------------------------------
// Sincronización del modelo con la base de datos (parecido a la migración)
const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Base de datos y tablas creadas');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};
syncDatabase();
console.log("*****************************************************************************")
//------------------------------------------------------------------------------------------

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));


app.get("/api", (req, res)=>{
  res.json(
    {
      mensaje: "hola"
    }
  )
})

app.post('/api/register', async (req, res) => {
  try {
    const existingUser = await UserModell.findOne( // usa el ORM para buscar en el modelo UserModell
      { 
        where: { username: req.body.username } 
      }
    ); 
    if (existingUser) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    const newUser = await UserModell.create({ // usa el ORM para crear el usuario si no existe
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10), //encripta el password
    });

    return res.status(201).json({ message: `Usuario  registrado exitosamente ` });
  } catch (error) {
    console.log("**********ERROR********** "+error)
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});


//----------  Ruta de inicio de sesión ---------- 
app.post("/api/login", async (req, res) => {
  try {
    const user = await UserModell.findOne({ where: { username: req.body.username } }); // buscar el usuario con el ORM
    if (!user) {
      return res.status(401).json({ message: 'Inicio de sesión fallido' });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => { // si lo encuentra desencripta la contraseña
      if (err || !result) {
        return res.status(401).json({ message: 'Inicio de sesión fallido' });
      }

      const accessToken = jwt.sign({ username: user.username }, 'accessSecret', { expiresIn: 60 });
      const refreshToken = jwt.sign({ username: user.username }, 'refreshSecret', { expiresIn: "8h" });
      res.status(200).json({"token": {"accessToken": accessToken, "refreshToken": refreshToken}}); //retorna el token
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});


app.get('/authorizer', (req, res) => {
  try {
    const accessToken = req.headers["authorization"].split(" ")[1];
    const refreshToken = req.headers.refreshtoken;
    
    if (typeof accessToken === "undefined") {
      return res.status(403).json({ error: "Token de acceso no proporcionado", isLogged: false });
    }
    
    jwt.verify(accessToken, "accessSecret", (error, decoded) => {
      if (error) {
        if (error.message === "jwt expired") {
          if (typeof refreshToken === "undefined") {
            return res.status(403).json({ error: "Token de acceso expirado y token de actualización no proporcionado", isLogged: false });
          }
          
          jwt.verify(refreshToken, "refreshSecret", (error, decoded) => {
            if (error) {
              if (error.message === "jwt expired") {
                return res.status(403).json({ error: "Token de acceso y token de actualización expirados", isLogged: false });
              } else {
                return res.status(403).json({ error: "Error al verificar el token de actualización", isLogged: false });
              }
            } else {
              const newAccessToken = jwt.sign({ userId: decoded.userId }, "accessSecret", { expiresIn: "1h" });
              const newRefreshToken = jwt.sign({ userId: decoded.userId }, "accessSecret", { expiresIn: "8h" });
              return res.status(200).json({ 
                message: "Acceso permitido", 
                isLogged: true,
                "token":{ 
                  accessToken: newAccessToken, 
                  refreshToken: newRefreshToken
                }
              });
            }
          });
        } else {
          return res.status(403).json({ error: error.message, isLogged: false });
        }
      } else {
        return res.status(200).json({ message: "Acceso permitido", isLogged: true });
      }
    });
  } catch (error) {
    console.log("**********ERROR********** " + error);
    return res.status(500).send({ error: error.message });
  }
});




const PUERTO = 3030;

app.listen(PUERTO, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PUERTO}`);
});