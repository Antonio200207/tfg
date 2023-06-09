window.onload = function(){
    
    // let urlParams = new URLSearchParams(window.location.search);

    // let alumno = urlParams.get('dni');
    
    let dni = window.localStorage.getItem('dni');
    let tipo = window.localStorage.getItem('tipo');
    
    if ((dni==null) || (tipo!="alumno")) {
      window.location.replace("../index.html");
    }else{
      let url = `http://localhost:8000/api/alumno/${dni}`;
      let metodo = 'GET';
      
      hacerPeticion(url, metodo);
      getAsignacion();
      getCurriculum();
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
           
            document.getElementById('alumno').innerHTML += container;            
        });

    })
    .catch(error => {
        alert('Error:', error);
    });
}

function generarHTML(alumno) {
    let html=``;
    html = `
        <table class="table">
        <tbody id="info">
        <tr>
            <th scope="row">DNI</th>
            <td>${alumno.dni}</td>
        </tr>
        <tr>
            <th scope="row">Nombre</th>
            <td><input type="text" id="nom" value="${alumno.nombre}"></td>
        </tr>
        <tr>
            <th scope="row">Apellidos</th>
            <td><input type="text" id="ape" value="${alumno.apellido}"></td>
        </tr>
        <button type="button" id="ver" class="btn btn-sm btn-outline-secondary" style onclick="actulizar('${alumno.dni}')">Actulizar</button>
        </tbody>
        </table>
        
    `;
    return html;
  }

  function actulizar(dni) {

    nom = document.getElementById('nom').value;
    apel = document.getElementById('ape').value;

    if ((nom.length < 3)||(apel.length < 6)) {
      alert("Los apellidos debe de tener minimo 4 caracteres y el nombre debe de tener minimo 3 caracteres");
    } else {
      const url = 'http://localhost:8000/api/alumno/' + dni;

      const data = {
        nombre: nom,
        apellido: apel
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
        alert('Se ha actualizado correctamente');
        document.getElementById('info').innerHTML = '';
        document.getElementById('ver').remove();
        let url = 'http://localhost:8000/api/alumno/'+dni;
        let metodo = 'GET';
        
        hacerPeticion(url, metodo);
      })
      .catch(error => {
        alert('Error a la hora de insertar el Alumno' + error);
      });
    }
  }
  function curriclum(se) {

    

    let lector = new FileReader();

    let url;
    let archivo = se.target.files[0];
    lector.readAsDataURL(archivo);
    lector.onload = () => {
      url = lector.result;
      let archivo = se.target.files[0];
    

    if (archivo.type == 'application/pdf') {

        let boton = `<button type="button" class="btn btn-success" onclick="subirCurriculum('${archivo.name}', '${url}')">Guardar CV</button>`;

        document.getElementById('botonSubir').innerHTML = boton;

    } else {
        alert('Tienes que subir un arhico pdf');
    }
    }
    
  }

function subirCurriculum(nom, ruta) {


    let dni = window.localStorage.getItem('dni');


    let cv = {
        nombre: nom,
        ruta: ruta,
        dni_alumno: dni
      };
    
      let url = "http://localhost:8000/api/cv";
    
 
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cv)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Datos Erroneos');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        getCurriculum()
        
      })
      .catch(error => {
        alert('Ya has subido un cv');
      });
     }
function getCurriculum() {


  let dni = window.localStorage.getItem('dni');
    

  let url = `http://localhost:8000/api/cv/${dni}`;
  let metodo = 'GET';

    let options = {
      method: metodo,
      headers: {
          'Content-Type': 'application/json',
      }
  };


  fetch(url, options)
  .then(response => response.json())
  .then(data => {
      let us = data.data;
   
      console.log(us);

          if (us.length === 0) {
            document.getElementById('existe').innerHTML = '<p><strong>No hay curriculum</strong></p>';  
          } else {
            document.getElementById('existe').innerHTML = '';  
            us.forEach(element =>  {

              let container = generarA(element);
      
              document.getElementById('existe').innerHTML += container;            
            });  
          }
      
      

  })
  .catch(error => {
      alert('Error:', error);
  });
}

function generarA(cv) {

  let html=``;
  html = `
      <p><strong>Nombre del arhivo: ${cv.nombre}</strong></p>
      <button type="button" id="borrar" class="btn btn-sm btn-outline-secondary" style onclick="borrar('${cv.id}','${cv.nombre}')" style="color:red;">Eliminar</button>
  `;
  if(confirm('¿Hay un CV, quieres verlo?')){
    var win = window.open();
     win.document.write('<iframe style="width : 100%; height : 100% "  src="' + cv.ruta  + '"></iframe>');
  }
  return html
}

function getAsignacion() {


  let dni = window.localStorage.getItem('dni');
    

  let url = `http://localhost:8000/api/asignacion/${dni}`;
  let metodo = 'GET';

    let options = {
      method: metodo,
      headers: {
          'Content-Type': 'application/json',
      }
  };

  // Realizar la petición a la API
  fetch(url, options)
  .then(response => response.json())
  .then(data => {
      let us = data.data;
      
      console.log(us);

          if (us.length === 0) {
            document.getElementById('asig').innerHTML = '<p><strong>No tienes todavia asiganaciones</strong></p>';  
          } else {
            document.getElementById('asig').innerHTML = '';  
            us.forEach(element =>  {

              let container = generarAs(element);
      
              document.getElementById('asig').innerHTML += container;            
            });  
          }
  })
  .catch(error => {
      console.log('Error:', error);
  });
}

function generarAs(asig) {
  let html=``;
  html = `
      <p><strong>Nombre de la empresa: ${asig.nom_empresa}, sede: ${asig.sede}, estado: ${asig.estado}</strong></p>
  `;
  
  return html
}

function borrar(id,nom) {
  borrar=confirm('¿Deseas eliminarl la empresa '+ nom +' ?');

  if (borrar) {
    fetch('http://localhost:8000/api/cv/' + id, {
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
      alert('Se ha borrado el cv correctamente');

      getCurriculum();

    })
    .catch(error => {
      alert(error);
    });
  }
}

function cerrar() {
  if(confirm('Seguro que quieres cerrar sesión')){
    localStorage.clear();
    window.location.replace("../index.html");
  }
}