var mysql = require('mysql');
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
   ExisteFrac: dir =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM FRACCIONAMIENTO WHERE dir_fra = ?', [dir],function(error, result){
            if (error)
              throw error;
               if (result.length >= 1)
               return resolve("Ya se ha registrado un fraccionamiento con esa direccion");         
            console.log("Esto es lo que me sale paps " + JSON.stringify(result));
            return resolve(0);
         });
      });
   },
   ExisteVig: correo =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM VIGILANTE WHERE cor_vig = ? ', [correo], function(error, result){
            if (error)
              throw error;
            if (result.length >= 1)
               return resolve("Ya se ha registrado un vigilante con ese correo electronico");         
            return resolve(0);
         });
      });
   },
   ExisteTelVig: telefono =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM VIGILANTE WHERE tel_vig = ? ', [telefono], function(error, result){
            if (error)
              throw error;
            if (result.length >= 1)
               return resolve("Ya se ha registrado un vigilante con ese numero telefonico");         
            return resolve(0);
         });
      });
   },
   ExisteFrac2: (dir, clave) =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM FRACCIONAMIENTO WHERE dir_fra = ?', [dir], function(error, result){
            if (error)
               throw error;
            if (result.length == 0)
               return resolve({estado:1, mensaje:"No hay ningún fraccionamiento registrado con esa dirección"});
            if (result[0].cla_fra != clave) 
               return resolve({estado:1, mensaje:"Clave del fraccionamiento incorrecta"});
            return resolve({estado:0, resultado: result});
         });
      }); 
   },
   ExistePlaca: placas =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM HABITANTE WHERE let_hab = ?', [placas], function(error, result){
            if (error)
               throw error;
            if (result.length != 0)
               return resolve({estado:1, mensaje:"Ya hay un auto registrado con esas placas"});
            return resolve({estado:0, resultado: result});
         });
      }); 
   },
   ExisteUser: user =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM HABITANTE WHERE cor_usu = ?', [user], function(error, result){
            if (error)
               throw error;
            if (result.length != 0)
               return resolve({estado:1, mensaje:"Ese usuario ya ha sido registrado, asegurese de no haber sido registrado en otro fraccionamiento"});
            return resolve({estado:0});
         });
      });
   },
   Capacidad: frac =>{
      return new Promise ((resolve, reject)=>{
         con.query('select habitante.nom_usu, fraccionamiento.cap_fra from habitante INNER JOIN fraccionamiento ON habitante.id_fra = fraccionamiento.id_fra where fraccionamiento.dir_fra =?', [frac], function(error, result){
            if (error)
               throw error;
            if (result.length > 1) {
               if ((result.length+1) > result[0].cap_fra) 
                  return resolve({estado:1 ,mensaje:"Este fraccionamiento ya esta lleno"})
            }
            return resolve({estado:0});
         });
      });
   },
   TodosHabitantes: id=>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT HABITANTE.nom_usu, CAR.est_car FROM HABITANTE INNER JOIN CAR ON CAR.let_car = HABITANTE.let_hab WHERE HABITANTE.id_fra = ?', [id], function(error, result){
            console.log("la longitud " + result.length)
            if (error)
               throw error;
            if (result.length == 0)
               return resolve({estado:1, mensaje:"No hay habitantes en este fraccionamiento"});
            return resolve({estado:0, mensaje:result});
         });
      }); 
   },
   Habitante: id=>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM HABITANTE INNER JOIN CAR ON CAR.id_car = HABITANTE.id_car WHERE HABITANTE.id_fra = ?', [id], function(error, result){
            if (error)
               throw error;
            if (result.length == 0)
               return resolve({estado:1, mensaje:"No hay habitantes en este fraccionamiento"});
            return resolve(result);
         });
      }); 
   },
   ExisteVig2: vig =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM VIGILANTE WHERE cor_vig = ? OR tel_vig = ?', [], function(error, result){
            if(error)
               throw error;
            if (result.length != 0)
               return resolve({estado:1, mensaje:"Ya hay una persona registrada con esos datos"});
            return resolve(0);
         });
      });
   }
} 
module.exports = funciones;
///de rendimiento, despliegue y ora madrola
