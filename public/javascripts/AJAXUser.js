function Registrarse(e) {
	var clave = document.getElementById('clave').value;
    var fraccionamiento = document.getElementById('opcion').value;
    var nombre = document.getElementById('nombre').value;
    var correo = document.getElementById('correo').value;
    var contra = document.getElementById('contraseña').value;
    var placas = document.getElementById('placas').value;
    var marca = document.getElementById('marca').value;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./Registrate", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({cla:clave, fra:fraccionamiento, nom:nombre, con:contra, pla: placas, cor:correo, mar:marca }));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
        	if (xhr.status == 200) {
        		M.toast({html: xhr.responseText})	
        	}else{
        		M.toast({html: xhr.responseText})	
        	}
      	}
    }
}
function Login() {
    var Nombre = document.getElementById('correo').value;
    var Contraseña = document.getElementById('contraseña').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./users/Login", true);//Enviar la peticion a la ruta en user
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom:Nombre, con: Contraseña}));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json.estado != 0){
                M.toast({html: json.mensaje});;
            }else{
                window.location.href = "./users/MiAuto";
            }
        }
        //if (xhr.readyState == 4 && xhr.status != 200){
          //  M.toast({html: 'Parece que estamos teniendo problemas '});
        //}
    } 
}