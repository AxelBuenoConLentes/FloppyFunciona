function Tabla(json, longitud) {
    var Tabl = document.createElement("table");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var tr = document.createElement("tr"); 
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    th1.innerHTML="Nombre";
    th2.innerHTML="Estado";
    tr.appendChild(th1);
    tr.appendChild(th2);
    thead.appendChild(tr);
    Tabl.appendChild(thead);
    Tabl.setAttribute("class","responsive-table"); 
    thead.setAttribute("id","col s5");
    for (var i = 0; i <= longitud -1 ; i++) {
        var th1a = document.createElement("th");
        var th2a = document.createElement("th");
        var tra = document.createElement("tr");
        console.log("EStp es etso " +JSON.stringify(json[i].nom_usu));
        var nombre = document.createTextNode(JSON.stringify(json[i].nom_usu));
        if (json[i].est_car.data == 0){
            var estado = document.createTextNode("Afuera");
            th2a.className = "card-panel red";    
            th1a.appendChild(nombre);
            th2a.appendChild(estado);
            tra.appendChild(th1a);
            tra.appendChild(th2a);
            tbody.appendChild(tra);
            Tabl.appendChild(tbody);
        }else{
            var estado = document.createTextNode("Adentro");
            th1a.appendChild(nombre);
            th2a.appendChild(estado);
            th2a.className  = "card-panel green";
            tra.appendChild(th1a);
            tra.appendChild(th2a);
            tbody.appendChild(tra);
            Tabl.appendChild(tbody);
        }
    }
    Tabl.className = "transicion-1";
    document.getElementById("Consultas").appendChild(Tabl);
}
//var formulario = document.getElementById('admin');
//formulario.addEventListener("onsubmit", LoginAdm(event));
function LoginAdm(e) {
    //e.preventDefault();
    var correo = document.getElementById('email').value;
    var contra = document.getElementById('contraseña').value; 
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./admin/Iniciar", true);//Enviar la peticion a la ruta en user
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({cor:correo, con:contra }));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);
            if (json.estado){
                M.toast({html: json.mensaje});
            }else{
                window.location.href = "./admin/AdminVig";
                return false ;
            }
        }
    }
}

function InsertarFrac(e) {
	var nombre = document.getElementById('nombre').value;
	var contra = document.getElementById('contraseña').value;
	var contac = document.getElementById('contacto').value;
	var telefo = document.getElementById('contactotelefono').value;
	var direcc = document.getElementById('direccion').value;
	var capaci = document.getElementById('capacidad').value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./RegistrarVigFrac", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom: nombre , pas: contra , cor: contac , tel: telefo , dir: direcc , cap: capaci ,}));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
			M.toast({html: xhr.responseText})
        }
    }
}

//Funcion ajax para modificar las madrolas del vigilnte
function ModificarDatosVig(e) {
    var nombre = document.getElementById('Mnombre').value;
    var correo = document.getElementById('Mcorreo').value;
    var contra = document.getElementById('Mtelefono').value;
    var telefo = document.getElementById('Mcontra').value;
    var frac = document.getElementById('fraccionamiento').value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./ModiVigil", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom: nombre , pas: contra , cor: correo , tel: telefo, fra: frac }));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            M.toast({html: xhr.responseText})
        }
    }
}

function ConsultarFrac(valor) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./EstadoFrac", true);//Enviar la peticion a la ruta en user
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom:valor}));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            Json = JSON.parse(xhr.responseText);
            console.log("esta cosa " + JSON.stringify(Json.mensaje.length));
            if (Json.estad == 1) {
                document.getElementById("Consultas").innerHTML ="";
                document.getElementById("Consultas").innerHTML = Json.mensaje;    
            }else{
                document.getElementById("Consultas").innerHTML ="";
                Tabla(Json.mensaje, Json.mensaje.length);
            }
        }   
    } 
}


/*
function ConsultarFrac(e) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./RegistrarVigFrac", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom: nombre , pas: contra , cor: contac , tel: telefo , dir: direcc , cap: capaci ,}));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
			alert("Esto es lo que se regresa " + JSON.stringify(xhr.responseText));
			//document.getElementById('exitoReg').inneHTML = xhr.responseText;
        }
    }	
}*/
