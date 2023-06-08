window.onload = function(){

    document.getElementById("acceder").onclick = comprobar;

    document.getElementById("cambiar").onclick = cambiar;
}

function cambiar(event) {
    event.preventDefault();

    window.location.href = "../index.html"
}

function comprobar(event) {
    
    event.preventDefault();

    let dnius = document.getElementById("dni").value;
    let nombreus = document.getElementById("Nombre").value;
    let apellidosus = document.getElementById("Apellidos").value;
    let tipous = document.getElementById("tipo").value;
    let contra1us = document.getElementById("contraseña").value;
    let contra2us = document.getElementById("contraseña2").value;

    let er=false;

    if (validarDNI(dnius)==false) {
        document.getElementById("text_dni").innerHTML = "";
        document.getElementById("error_dni").innerText = "DNI INCORRECTO";
        er = true;
    }else{
          document.getElementById("error_dni").innerText = "";
    }
    if (nombreus=="") {
        document.getElementById("text_nombre").innerHTML = "";
        document.getElementById("error_Nombre").innerText = "NOMBRE INCORRECTA";
        er = true;
    }else{
        document.getElementById("error_Nombre").innerText = "";    
    } 
    if (apellidosus=="") {
        document.getElementById("text_apellidos").innerHTML = "";
        document.getElementById("error_Apellidos").innerText = "APELLIDOS INCORRECTA";
        er = true;
    }else{
        document.getElementById("error_Apellidos").innerText = "";                             
    }
    if (tipous=="") {
        document.getElementById("error_tipo").innerText = "DEBES DE SELLECIONAR UNO";
        er = true;
    }else{
        document.getElementById("error_tipo").innerText = "";
    }  
    if (contra1us=="" || contra2us=="" || contra1us!=contra2us || (contra1us.length<4)||(contra1us.length>10) ) {
        document.getElementById("cont").innerHTML = "";
        document.getElementById("error_contraseña").innerText = "CONTRASEÑAS INCORRECTAS";
        er = true;
    }else{
        document.getElementById("cont").innerHTML = "<span style='color: green;'>CONTRASEÑAS CORRECTAS</span>";
        document.getElementById("error_contraseña").innerText = "";  
    }
    
    
    if (er==false) {

        
        const url = "http://localhost:8000/api/register";
        const data = {
          dni: dnius,
          tipo: tipous,
          password: contra1us
        };

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            // Manipular los datos de la respuesta
            console.log(data);
            if (tipous=="alumno") {
              crearAlumno(dnius, nombreus, apellidosus);
  
            } else {
              crearDocente(dnius, nombreus, apellidosus);
            }

          })
          .catch(error => {
            // Manejar errores en caso de que la llamada falle
            alert('Ya hay un usuario crado con dni: '+dnius);
          });
      }
    
}

function validarDNI(dni) {
    let letra = dni.charAt(dni.length-1);
    let numeros = dni.substring(0, dni.length-1);
    let expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
    
    if(expresion_regular_dni.test(dni) === true){
      let letraCalculada = 'TRWAGMYFPDXBNJZSQVHLCKET';
      let posicion = numeros % 23;
      let letraCorrecta = letraCalculada.charAt(posicion);
      
      if(letraCorrecta === letra.toUpperCase()){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

function crearAlumno(dnius, nombreus, apellidosus) {
  let usuario = {
    dni: dnius,
    nombre: nombreus,
    apellido: apellidosus
  };

  // Endpoint de la API para registrar usuarios
  let url = "http://localhost:8000/api/newAlumno";

  // Configuración de la solicitud POST
  let opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  };

  // Envío de la solicitud POST
  fetch(url, opciones)
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al registrar alumno");
    }
    alert('alumno creado');
    window.localStorage.setItem('dni', dnius);
    window.localStorage.setItem('tipo', 'alumno');
    window.location.href = 'infoAlumno.html';
  })
  .catch(error => alert(error));
}

function crearDocente(dnius, nombreus, apellidosus) {
  let usuario = {
    dni: dnius,
    nombre: nombreus,
    apellido: apellidosus
  };

  // Endpoint de la API para registrar usuarios
  let url = "http://localhost:8000/api/newDocente";

  // Configuración de la solicitud POST
  let opciones = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  };

  // Envío de la solicitud POST
  fetch(url, opciones)
  .then(response => {
    if (!response.ok) {
      throw new Error("Error al registrar docente");
    }
    alert('Docente creado');
    window.localStorage.setItem('dni', dnius);
    window.localStorage.setItem('tipo', 'docente');
    window.location.href = 'profesor.html';
    
  })
  .catch(error => alert(error));
}

