var mysql = require('mysql'); 
var DBVal = require('../ControladorAdmin/DBAdminRegex.js');
const cipher = require('../../routes/cipher.js');
const escape = require("mysql").escape;
var con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'n0m3l0',
   database: 'Floppy',
   port: 3306
});
con.connect(function(error){
   if(error){
      throw error;
   }else{ 
      console.log('Conexion correcta.');
   }
});

var funciones = {
  Registrar: user =>{
    return new Promise((resolve, reject) => {
      DBVal.ExisteFrac2(user.fra, user.cla).then(fraccionamiento =>{
        if(fraccionamiento.estado != 0)
          return resolve(fraccionamiento.mensaje);
        DBVal.ExisteUser(user.cor).then(usuario=>{
          if (usuario.estado !=0 ) 
            return resolve(usuario.mensaje);
          DBVal.ExistePlaca(user.pla).then(placas =>{
            if (placas.estado !=0 )
              return resolve(placas.mensaje);
            DBVal.Capacidad(fraccionamiento.resultado[0].dir_fra).then(capacidad =>{
              if (capacidad.estado !=0) 
                return resolve(capacidad.mensaje);
              con.query('CALL TransaUser(?,?,?,?,?,?) ', [user.nom, user.cor, cipher.cifrar(user.con), user.pla, fraccionamiento.resultado[0].id_fra, user.mar], (err, result) => {
                if (err)
                  throw err;
                return resolve("Se ha registrado correctamente")
              });
            });
          });
        });
      });
    });
  },
  Login: hab =>{
    return new Promise((resolve, reject) =>{
      con.query('SELECT *FROM HABITANTE WHERE cor_usu = ?', [hab.nom], (err, result) => {
        if (err)
          throw err;
        if (result.length == 0) 
          return resolve("Ese usuarion no existe");
        console.log("Hola "+hab.con +" " + cipher.decifrar(result[0].pas_usu));
        if (hab.con != cipher.decifrar(result[0].pas_usu)) 
          return resolve("Contraseña incorrecta");
        return resolve(0);
      });
    });
  },
  ConsultaHab: hab =>{
    return new Promise((resolve, reject)=>{
      con.query('SELECT *FROM HABITANTE INNER JOIN CAR ON HABITANTE.id_car = CAR.id_car WHERE HABITANTE.cor_usu = ?', [hab], (err, result) => {
        if (err) 
          throw err;
        return resolve(result); 
      });
    });
  }
}
module.exports = funciones;