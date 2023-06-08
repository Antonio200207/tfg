window.onload = function(){
    
    let dni = window.localStorage.getItem('dni');
    let tipo = window.localStorage.getItem('tipo');

    if ((dni==null) || (tipo!="docente")) {
      window.location.href = '../index.html';
    }else{
      let urlParams = new URLSearchParams(window.location.search);

      let empresa = urlParams.get('nombre');
  
      mensaje = `
          <h1 class="fw-light" id="nombrEmpresa">Sedes de ${empresa}</h1>
      `;
  
      document.getElementById('nombrEmpresa').innerHTML = mensaje;
  
      document.getElementById('desc').innerHTML = 'desc';
  
      let url = `http://localhost:8000/api/sedes/${empresa}`;
      let metodo = 'GET';
  
      hacerPeticion(url, metodo);
    }
}





function hacerPeticion(url, metodo) {


    let options = {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',

        }
    };

    document.getElementById("form").innerHTML = ' ';
    fetch(url, options)
    .then(response => response.json())
    .then(data => {

   
        let us = data.data;
        us.forEach(element => {
    
            let container = generarHTML(element);
           
            document.getElementById('sedes').innerHTML += container;            
        });

    })
    .catch(error => {
   
        alert('Error:', error);
    });
}

function generarHTML(se) {
   
    let html=``;
    html = `
        <tr>
            <td>${se.id}</td>
            <td>${se.nombre}</td>
            <td>${se.direccion}</td>
            <td><button type="button" id="borrar" class="btn btn-sm btn-outline-secondary" style onclick="borrar('${se.id}','${se.nombre}')" >Eliminar</button></td>
        </tr>
    `;
    return html;
  }

  function mostrarform() {
  
    let div = document.getElementById("form");

    if (div.innerHTML === "") {
    let form = document.createElement("div");
    let label1= document.createElement("label");
    label1.innerHTML = "Nombre:";
    let campo1 = document.createElement("input");
    campo1.type = "text";
    campo1.name = "nom";
    campo1.id = "nom";
    let label2= document.createElement("label");
    label2.innerHTML = "direccion:";
    let campo2 = document.createElement("input");
    campo2.type = "text";
    campo2.name = "direccion";
    campo2.id = "dir";
  
    let boton = document.createElement("button");
    
    boton.innerHTML = "Guardar";
    boton.onclick = function() { guardar(campo1.value, campo2.value); };

    form.appendChild(label1);
    form.appendChild(campo1);
    form.appendChild(label2);
    form.appendChild(campo2);
    
    form.appendChild(boton);

    div.appendChild(form);
  
    div.classList.add("mostrar");
    }else{
      div.innerHTML = '';
    }
  }

  function guardar(nombre, direccion) {
    
    if ((nombre.length < 2)||(direccion.length < 4)) {
      alert("La direccion debe de tener minimo 4 caracteres y el nombre debe de tener minimo 3 caracteres")
    }
    else{
      let urlParams = new URLSearchParams(window.location.search);

      let empresa = urlParams.get('nombre');

      const url = 'http://localhost:8000/api/sedes';
      const data = {
        nombre: nombre,
        direccion: direccion,
        empresa: empresa
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
        let urlParams = new URLSearchParams(window.location.search);
        let empresa = urlParams.get('nombre');
        let url = `http://localhost:8000/api/sedes/${empresa}`;
        let metodo = 'GET';
        document.getElementById('sedes').innerHTML = '';
        hacerPeticion(url, metodo);  
      })
      .catch(error => {
        alert('Error a la hora de insertar la empresa' + error);
      });
  }
  }
  function borrar(id,nom) {
    borrar=confirm('¿Deseas eliminar la sede '+ nom +' ?');
    let urlParams = new URLSearchParams(window.location.search);
    let empresa = urlParams.get('nombre');
    
    if (borrar) {
      fetch('http://localhost:8000/api/sede/' + id, {
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
        alert('Se ha borrado la sede correctamente');
        document.getElementById('sedes').innerHTML = '';
        let url = `http://localhost:8000/api/sedes/${empresa}`;
        let metodo = 'GET';
        hacerPeticion(url, metodo);
      })
      .catch(error => {
        alert(error);
      });
    }
  }
  function cerrar() {
    if(confirm('Seguro que quieres cerrar sesión')){
      localStorage.clear();
      window.open('../index.html');
    }
  }