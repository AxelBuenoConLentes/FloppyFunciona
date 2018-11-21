function LoginVig(e) {
    var cor = document.getElementById('email').value;
    var con = document.getElementById('contraseña').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./vig/Ingresar", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({corvig:cor , convig:con}));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json.estado != 0){
                M.toast({html: json.mensaje});;
            }else{
                window.location.href = "./vig/EnviarClave";
            }
        }
    }
}
function EnviarEmail(e) {
	var nombre = document.getElementById('correo').value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./Enviar", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({cor: nombre}));
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

function ModificarHab(e) {
    var query = document.getElementById('busqueda').value
    var nombre = document.getElementById('nombre').value;
    var contra = document.getElementById('contraseña').value;
    //pla: placas,
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./ModificarHab", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom: nombre, con: contra,  que: query}));
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