var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'DinamitaSoftCorporation@gmail.com',
    pass: 'dinamitasoftware123.'
  }
});

var funciones ={
	enviar: (usuario, clave )=>{
		console.log("Otra cosa " + usuario.cor );
		var mailOptions = {
		  from: 'DinamitaSoftCorporation@gmail.com',
		  to: usuario.cor,
		  subject: 'Bienvenido a nuestra comunidad Floppy',
		  text: 'Al parecer quieres ser registrado en nuestra aplicación.'+
		  'Debido a questiones de de seguridad tenemos que enviar un codigo de autentificación a nuestros usuarios, usted tendra que poner este codigo en el campo '+
		  '"codigo", el cual está posicionado a un lado del campo de Fraccionamiento.'+
		  'Codigo: '+ clave
		};
		return new Promise ((resolve, reject)=>{
			transporter.sendMail(mailOptions, function(error, info){
			if (error) 
				console.log(error); 
			console.log('Email enviado: ');
			return resolve("El email ha sido enviado");
			});
		});
	} 
};

module.exports = funciones;