window.onload = function(){

  let dni = window.localStorage.getItem('dni');
  let tipo = window.localStorage.getItem('tipo');
  
  if ((dni==null) || (tipo!="docente")) {
    window.location.replace("../index.html");
  }else{
    let url = `http://localhost:8000/api/alumnos`;
    let metodo = 'GET';
    
    hacerPeticion(url, metodo);
  
  }
}


function borraAlumno(dni) {
  
  
  borrar=confirm('¿Deseas eliminarl el usuario '+ dni +' ?');

  if (borrar) {
    fetch('http://localhost:8000/api/alumno/' + dni, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Datos Erroneos');
      }
      return response.json();
    })
    .then(data => {
      alert('Se ha borrado el alumno correctamente');
      borraUser(dni);
      document.getElementById('alumnos').innerHTML = ' ';
      hacerPeticion(`http://localhost:8000/api/alumnos`, 'GET');
    })
    .catch(error => {
      alert(error);
    });
  }
  
}

function borraUser(dni) {
  
  
  if (borrar) {
    fetch('http://localhost:8000/api/user/' + dni, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Datos Erroneos');
      }
      return response.json();
    })
    .then(data => {

    })
    .catch(error => {
      alert(error);
    });
  }
  

}

function borrarForm(dni) {
  alert('borra');
  let div = document.getElementById("form"+dni);
  div.remove();

}
function mostrarform(dni,nombre,apellido) {
  
  let div = document.getElementById("form"+dni);
  
  if (div.innerHTML === "") {
    let form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "");
    form.setAttribute("id", "datos");
    
    let label1 = document.createElement("label");
    label1.innerHTML = "Dni:";
    form.appendChild(label1);

    let input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("value", dni);
    input1.setAttribute("readonly","readonly");
    form.appendChild(input1);

    let label2 = document.createElement("label");
    label2.innerHTML = "Nombre:";
    form.appendChild(label2);

    let input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    input2.setAttribute("value", nombre);
    input2.setAttribute("readonly","readonly");
    form.appendChild(input2);

    let label3 = document.createElement("label");
    label3.innerHTML = "Apellidos:";
    form.appendChild(label3);

    let input3 = document.createElement("input");
    input3.setAttribute("type", "text");  
    input3.setAttribute("value", apellido);
    input3.setAttribute("readonly","readonly");
    
    form.appendChild(input3);

    div.appendChild(form);

    div.classList.add("mostrar");
  
  } else {
    div.innerHTML ='';
  }

}

function hacerPeticion(url, metodo) {
  
 
    let options = {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}` // Agregar el token al encabezado de Authorization
        }
    };

 
    fetch(url, options)
    .then(response => response.json())
    .then(data => {

 
        let us = data.data;
        us.forEach(element => {
 
            let container = generarHTML(element);
 
            document.getElementById('alumnos').innerHTML += container;            
        });

    })
    .catch(error => {
        
        alert('Error:', error);
    });
}

function generarHTML(us) {
    
    let html=``;
    html = `
        <div class="col">
        <div class="card shadow-sm">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">${us.dni}</text></svg>
                <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary" onclick="location.href='infoAlumProfesorado.html?dni=${us.dni}'">Editar</button>
                <button type="button" id="borrar" class="btn btn-sm btn-outline-secondary" style onclick="borraAlumno('${us.dni}')" >Eliminar</button>
                <button type="button" class="btn btn-success"  onclick="mostrarform('${us.dni}','${us.nombre}','${us.apellido}')">+</button>
                </div>
                
                <div id="form${us.dni}" ></div>

            </div>
            </div>
        </div>
    </div>
    `;
    return html;
  }

  function cerrar() {
    if(confirm('Seguro que quieres cerrar sesión')){
      localStorage.clear();
      window.location.replace("../index.html");
    }
  }