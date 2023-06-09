window.onload = function(){

     document.getElementById("acceder").onclick = comprobar;
    
     document.getElementById("cambiar").onclick = cambiar;
}

function cambiar(event) {
    event.preventDefault();
    
    window.location.replace("html/register.html");
    
}

function comprobar(event)  {
    
    event.preventDefault();

    er = false;

    let dnius = document.getElementById("dni").value;
    //alert(document.getElementById("dni").value);
    let contraus = document.getElementById("contraseña").value;
    //alert(document.getElementById("contraseña").value);
    console.log(document.getElementById("dni"));
    if (validarDNI(dnius)==false) {
        document.getElementById("text_dni").innerHTML = "";
        document.getElementById("error_dni").innerText = "DNI INCORRECTO";
        er = true;
    }else{
        document.getElementById("error_dni").innerText = "";
    }    
    if (contraus=="") {
        document.getElementById("text_contra").innerHTML = "";
        document.getElementById("error_contraseña").innerText = "CONTRASEÑA INCORRECTA";
        er = true;
    }else{
        if ((contraus.length<4)||(contraus.length>10)) {
            document.getElementById("text_contra").innerHTML = "";
            document.getElementById("error_contraseña").innerText = "TIENE QUE METER ENTRE 4 Y 10 CARACTERES";
            er = true;
        }else{
            document.getElementById("error_contraseña").innerText = "";    
        }     
    }
 
    if (er==false) {
      login(dnius, contraus);
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

function login(us, conta) {
  const url = 'http://localhost:8000/api/login';

  const data = {
    dni: us,
    password: conta
  };

  fetch(url, {
 method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Datos Erroneos');
    }
    return response.json();
  })
  .then(data => {
    console.log('logeado');
    let us = data.data;

    console.log(us);

        if (us.length === 0) {
          alert('Usuario no encontrado');  
        } else {
          alert('Usuario encontrado');
          alert(us[0].tipo);
          if (us[0].tipo == "alumno") {
            window.localStorage.setItem('dni', us[0].dni);
            window.localStorage.setItem('tipo', 'alumno');
            window.location.replace("html/infoAlumno.html");
          } else {
            window.localStorage.setItem('dni', us[0].dni);
            window.localStorage.setItem('tipo', 'docente');
            window.location.replace("html/profesor.html");
          }
    
        }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}