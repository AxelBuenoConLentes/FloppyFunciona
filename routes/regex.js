var regex = {
	ValAdm: adm =>{
		if (adm.cor.length <= 3 || adm.con.length <=3) 
			return "El correo electronico y la contraseña deben ser mayor a tres caracteres";
		if (adm.cor.length == 0 || adm.con.length == 0) 
			return "Ingresa todos los datos";
		return 0;
	},
	ValRegistroVigYFrec: vig => {
		let regexNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
		let regex = /^[a-zàèìòùñA-ZÀÈÌÒÙÑ0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
		let regexNumber =/^[0-9]+$/;
		if (vig.nom.length == 0 || vig.pas.length == 0 || vig.cor.length == 0 || vig.tel.length == 0 || vig.dir.length == 0 || vig.cap.length == 0 ) 
			return "Tiene que llenar todos los campos";
		if (!regex.test(vig.cor))
			return "Cumple con el fromato establecido del correo electronico";
		if (!regexNumber.test(vig.tel) || vig.tel.length < 8 || vig.tel.length > 8 )
			return "Ingresa un número telefonico valido de 8 números"; 
		if (!regexNombre.test(vig.nom))
			return "Ingresa un nombre valido"; 
		if (parseInt(vig.cap) > 10 ) 
			return "La capacidad del fraccionamiento no tiene que superar la cantidad de 10 vehiculos, ni ser cantidades negativas";
		return 0;
	},
	ValModifiVig: vig =>{//"fra":"Ciudad Almeja
		if (vig.nom.length == 0 && vig.pas.length  == 0 && vig.cor.length  == 0 && vig.tel.length == 0 ) 
			return "Tienes que llenas por lo menos un campo";
	},
	ValVig: vig => {
		if (vig.corvig.length <= 3 || vig.convig.length <=3) 
			return "El correo electronico y la contraseña deben ser mayor a tres caracteres";
		if (vig.corvig.length == 0 || vig.convig.length == 0) 
			return "Ingresa todos los datos";
		return 0;
	},
	ValModifiHab: hab => {
		let regexNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
		let regexPlaca = /^([A-Z]{3})+([0-9]{3,4})$/;
		if (hab.nom.length == 0 && hab.con.length  == 0) 
			return "Tienes que llenas por lo menos un campo";
		if (hab.nom.length > 99 || hab.con.length > 99 ) 
			return "Los campos no pueden sobrepasar los 99 caracteres";
		/*if (hab.pla.length > 7 || hab.pla.length < 6 ) 
			return "Las placas de la CDMX tienen que cumplir con el siguiente formato AAA-999 o AAA-9999";
		if (!regexPlaca.test(hab.pla)) 
			return "Las placas de la CDMX tienen que cumplir con el siguiente formato AAA-999 o AAA-9999";*/
		return 0;
	},
	ValUserRegistro: user =>{
		let regexNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
		let regex = /^[a-zàèìòùñA-ZÀÈÌÒÙÑ0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
		let regexPlaca = /^([A-Z]{3})+([0-9]{3,4})$/;
		if (user.cla.length == 0 ||  user.fra.length == 0 || user.nom.length == 0 || user.con.length == 0 || user.pla.length == 0 || user.cor.length == 0 || user.mar.length == 0 ) 
			return "Tiene que llenar todos los campos";
		if (user.cla.length > 99 ||  user.fra.length > 99 || user.nom.length > 99 || user.con.length == 99 || user.pla.length == 0 || user.cor.length == 0 || user.mar.length == 0 ) 
			return "Los campos no pueden sobrepasar los 99 caracteres";
		if (!regex.test(user.cor)) 
			return "Cumple con el fromato establecido del correo electronico";
		if (!regexNombre.test(user.nom))
			return "Escribe un nombre valido";
		if (user.pla.length > 7 || user.pla.length < 6 ) 
			return "Las placas de la CDMX tienen que cumplir con el siguiente formato AAA-999 o AAA-9999";
		if (!regexPlaca.test(user.pla)) 
			return "Las placas de la CDMX tienen que cumplir con el siguiente formato AAA-999 o AAA-9999";
		if (user.con.length >=17 || user.con.length <=8) 
			return "La contraseña tiene que se de mas de 8 caracteres y menor que 17";
		return 0;
	},
	ValUserLogin: user =>{
		if (user.nom.length ==0 || user.con.length ==0) 
			return "Llena todos los campos por fa";
		return 0;
	}
}
module.exports = regex; 