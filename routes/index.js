var express = require('express');
var router = express.Router();
const path = require('path');
const body_parser = require('body-parser');
const regex = require('./regex');
const DB = require('../DB/ControladorAdmin/DBAdmin');
const DBUser = require('../DB/ControladorUser/DBUser');
/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile("index.html", {root: path.join(__dirname, "../public/html")});
});

router.get('/RegistroUsuario', function(req, res) {
	DB.ConsultarFrac().then(Fraccionamientos =>{ 
		console.log("Fraccionamientos :: " + Fraccionamientos)
		return res.render("Registrate", {Fraccionamiento: Fraccionamientos});
	});
});

router.post('/Registrate' , function(req, res) {
	console.log(JSON.stringify(req.body));
	validado = regex.ValUserRegistro(req.body);
	if (validado != 0)
		return res.send(validado);
	DBUser.Registrar(req.body).then(registro =>{
		return res.send(registro);
	});
});


module.exports = router;
