var crypto = require('crypto');

var funciones = {
  cifrar: parametros =>{
    var cipher = crypto.createCipher("aes-128-cbc", 'secret key 12345')
    var cifrado = cipher.update(parametros, 'utf8', 'base64')
    cifrado += cipher.final('base64');
    return cifrado
  },
  decifrar: parametros =>{
    console.log("Estos son los parametros " +parametros);
    var cipher = crypto.createDecipher("aes-128-cbc", 'secret key 12345')
    var descifrado = cipher.update(parametros, 'base64', 'utf8')
    descifrado += cipher.final('utf8');
  	return descifrado;
  }
}
module.exports = funciones;
