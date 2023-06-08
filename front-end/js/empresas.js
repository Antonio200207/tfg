window.onload = function(){
    
  let dni = window.localStorage.getItem('dni');
  let tipo = window.localStorage.getItem('tipo');

    
  if ((dni==null) || (tipo!="docente")) {
    window.location.href = '../index.html';
  }else{
    let url = `http://localhost:8000/api/empresas`;
    let metodo = 'GET';
    
    hacerPeticion(url, metodo);
  }
    

}


function hacerPeticion(url, metodo) {
  
    // Configurar la solicitud HTTP
    // Obtener el token del localStorage
    //let token = 'UHnv1KyVXCpvlPwpe6zkTjD1VzKmhGMFktGGPFODhYgdpvCjk5mWVriVKjWVrEZ9'//localStorage.getItem('token');

    let options = {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}` // Agregar el token al encabezado de Authorization
        }
    };

    // Realizar la petición a la API
    fetch(url, options)
    .then(response => response.json())
    .then(data => {

        // Obtener el usuario de la respuesta
        let us = data.data;
        us.forEach(element => {
            // Generar el contenido HTML para mostrar los datos del usuario
            let container = generarHTML(element);
            // Mostrar los datos en el elemento HTML
            document.getElementById('empresas').innerHTML += container;            
        });

    })
    .catch(error => {
        // Manejar cualquier error en la petición
        alert('Error:', error);
    });
}

function generarHTML(em) {
    // Generar el contenido HTML para mostrar los datos del usuario
    let html=``;
    html = `
        <div class="col">
        <div class="card shadow-sm">
            <div class="card-body">
            <p class="card-text">Nombre:<strong> ${em.Nombre}</strong></p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <button type="button" id="ver" class="btn btn-sm btn-outline-secondary" onclick="location.href='sede.html?nombre=${em.Nombre}'">Ver Sedes</button>
                <button type="button" id="borrar" class="btn btn-sm btn-outline-secondary" style onclick="borrar('${em.Nombre}')" style="color:red;">Eliminar</button>
                <button type="button" id="ver" class="btn btn-sm btn-outline-secondary" style onclick="mostrarformularioUpdate('${em.Nombre}','${em.descripcion}')">Editar</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
    return html;
  }

  function mostrarformularioUpdate(nom,desc) {
  
    let div = document.getElementById("form");
    if (div.innerHTML === "") {
    alert('Esta es la descripcion de '+nom+' '+desc);
    let form = document.createElement("div");
    let label1= document.createElement("label");
    label1.innerHTML = 'Nombre:';
    let campo1 = document.createElement("input");
    campo1.type = "text";
    campo1.name = "nom";
    campo1.id = "nom";
    campo1.readOnly = true;
    campo1.value = nom;
    let label2= document.createElement("label");
    label2.innerHTML = 'descripcion:';
    let campo2 = document.createElement("input");
    campo2.type = "text";
    campo2.name = "descr";
    campo2.id = "dir";
    campo2.value = desc;
  
    let boton = document.createElement("button");
    
    boton.innerHTML = "Actualizar";
    boton.onclick = function() { actualizar(campo1.value, campo2.value); };

    form.appendChild(label1);
    form.appendChild(campo1);
    form.appendChild(label2);
    form.appendChild(campo2);
    
    form.appendChild(boton);

    div.appendChild(form);
  
    div.classList.add("mostrar");
    }else{
      div.innerHTML ='';
    }
  }
  function mostrarformulario() {
  
    let div = document.getElementById("form");

    if (div.innerHTML === "") {
      let form = document.createElement("div");
      let label1= document.createElement("label");
      label1.innerHTML = 'Nombre:';
      let campo1 = document.createElement("input");
      campo1.type = "text";
      campo1.name = "nom";
      campo1.id = "nom";
      let label2= document.createElement("label");
      label2.innerHTML = 'descripcion:';
      let campo2 = document.createElement("input");
      campo2.type = "text";
      campo2.name = "descr";
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
      div.innerHTML ='';
    }

  
  }




  function guardar(nom, desc) {
    
    
    if ((nom.length < 2)||(desc.length < 4)) {
      alert("La descripcion debe de tener minimo 4 caracteres y el nombre debe de tener minimo 3 caracteres")
    } else {
      const url = 'http://localhost:8000/api/empresas';

      const data = {
        nombre: nom,
        descripcion: desc,
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
  
        document.getElementById('empresas').innerHTML = '';
        let url = `http://localhost:8000/api/empresas`;
        let metodo = 'GET';
        
        hacerPeticion(url, metodo);
      })
      .catch(error => {
        alert('Error a la hora de insertar la empresa' + error);
      });
    }
  }

  function actualizar(nom, desc) {
    
    if ((nom.length < 2)||(desc.length < 4)) {
      alert("La descripcion debe de tener minimo 4 caracteres y el nombre debe de tener minimo 3 caracteres")
    } else {
      
      const url = 'http://localhost:8000/api/empresa/' + nom;

      const data = {
        descripcion: desc
      };
    
      fetch(url, {
        method: 'PUT',
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
        alert('Se ha actulizado la empresa correctamente');
        document.getElementById('empresas').innerHTML = '';
        document.getElementById("form").innerHTML = '';
        let url = `http://localhost:8000/api/empresas`;
        let metodo = 'GET';
        
        hacerPeticion(url, metodo);
      })
      .catch(error => {
        alert('Error a la hora de insertar la empresa' + error);
      });
  }
  }

  function borrar(nom) {
    borrar=confirm('¿Deseas eliminarl la empresa '+ nom +' ?');

    if (borrar) {
      fetch('http://localhost:8000/api/empresa/' + nom, {
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
        alert('Se ha borrado la empresa correctamente');
        document.getElementById('empresas').innerHTML = '';
        let url = `http://localhost:8000/api/empresas`;
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