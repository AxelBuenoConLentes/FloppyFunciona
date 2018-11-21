var express = require('express');
var session = require('express-session');
var router = express.Router();
var DB = require('../DB/ControladorAdmin/DBAdmin');
var val = require('./regex');
const path = require('path');
const body_parser = require('body-parser');

router.use(body_parser.json());
router.use(body_parser.urlencoded({extended: true}));
router.use(session(
	{secret: 'abcd1234567',
	resave: false,
	saveUninitialized:false,
	cookie: {
		path:'/admin'
	}
}));
//Cambiar la ruta de estas madrolas para que las sesiones no tengan problemas entre si
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.sendFile("InicioSesionAdmin.html", {root: path.join(__dirname, "../public/html")});
	if (req.session.nombre != null)
	 	return res.redirect('./admin/AdminVig');
	console.log(req.session.nombre)
});

router.post('/Iniciar', function(req,res) {
	validado = val.ValAdm(req.body);
	if (validado != 0)
		return res.json({estado:1, mensaje:validado});
	DB.Iniciar(req.body).then(succes=>{
		if (succes.response != 1)
			return res.json({estado:1,mensaje: "Contraseña o usuario incorrecto"});
		if (req.body.con != "mauricio")
			return res.json({estado:1,mensaje: "Usuarion o contraseña incorrecta"});
		req.session.nombre = succes.nombre;
		return res.json({mensaje: 0});
	});
});

router.post('/RegistrarVigFrac', function(req,res) {
	//if(!req.session.nombre)
		//return res.send("Primero tienes que iniciar sesion");
	validado = val.ValRegistroVigYFrec(req.body);
	if (validado != 0)
		return res.send(validado);
	DB.InsertarVig(req.body).then(Vigilante=>{
		if (Vigilante != 1)
			return res.send(Vigilante);
		DB.InsertarFrac(req.body).then(Fraccionamiento=>{
			if (Fraccionamiento != 1)
				return res.send(Fraccionamiento);
			DB.InsertarIdVig(req.body).then(succes=>{
				res.send("El fraccionamiento y su vigilante ha sido registrados");
			});
		});
	});
});

router.post('/EstadoFrac', function(req,res) {
	//if(!req.session.nombre)
	//	return res.send("Primero tienes que iniciar sesion");
	DB.ConsultarFrac2(req.body).then(Fraccionamientos =>{
		if (Fraccionamientos.estado == 1)
			return res.json({estad:1 ,mensaje:Fraccionamientos.resultado});
		return res.json({estad:0 , mensaje: Fraccionamientos.resultado});
	});
});

router.post('/ModiVigil', function(req, res){
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	/*console.log("El req body " + req.body.nom.length);
	validado = val.ValModifiVig(req.body);
	if (validado != 0 ) 
		return res.send(validado);
	
	if (req.body.nom.length != 0 ){
		console.log("Que eesta pasando");w
	} 
	if (req.body.nom.length !=0 ){
		DB.ModificarNombreVigilante(req.body).then(succes=>{
			
		});
	} 
	/*if (req.body.pas.length !=0){
		DB.ModificarContraseñaVigilante(req.body).then(cosa =>{
		});
	}
	if (req.body.cor.length !=0){
		DB.ModificarCorreoVigilante(req.body).then(esto=>{
		});
	} */
});

/*Rutas get para cambiar de página*/
//Arreglar las sesiones, funciona en el primer ejs, pero cuando cambias a otro ya no aparece el nombre
router.get('/AdminVig',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	DB.ConsultarFrac().then(fraccionamiento =>{
		console.log("Estes es el resultado " + JSON.stringify(fraccionamiento));
		return res.render("VistasAdmin/AdmVig", {user: req.session.nombre, Fraccionamiento: fraccionamiento});
	});
});

router.get('/Registros',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	DB.ConsultarVigyFrac(req.body).then(succes=>{
		return res.render("VistasAdmin/UsRegis", {user: req.session.nombre, Consulta: succes[0]});
	});
});

router.get('/Fraccionamientos',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	DB.ConsultarFrac(req.body).then(succes=>{
		/*if (succes.length == 0)
			return res.render("VistasAdmin/Fraccion", {user: req.session.nombre});
		console.log("Esto es esto " + JSON.stringify(succes) );*/
		return res.render("VistasAdmin/Fraccion", {user: req.session.nombre, Fraccionamiento: succes});
	});
});

router.get('/Salir/',function(req, res) {
	req.session.nombre = null;
	res.redirect('/');
});

module.exports = router;
