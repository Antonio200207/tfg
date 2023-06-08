window.onload = function(){
    
    
    let urlParams = new URLSearchParams(window.location.search);

    let alumno = urlParams.get('dni');
    let dni = window.localStorage.getItem('dni');
    let tipo = window.localStorage.getItem('tipo');
    
    if ((dni==null) || (tipo!="docente")) {
        window.location.href = '../index.html';
    }else{
        let url = `http://localhost:8000/api/alumno/${alumno}`;
        let metodo = 'GET';
        
        hacerPeticion(url, metodo);
    
        empresa();
    
        getCurriculum();
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
            document.getElementById('alumno').innerHTML += container;            
        });

    })
    .catch(error => {
        // Manejar cualquier error en la petición
        alert('Error:', error);
    });
}


function generarHTML(alumno) {
    // Generar el contenido HTML para mostrar los datos del usuario
    let html=``;
    html = `
        <table class="table">
        <tbody>
        <tr>
            <th scope="row">DNI</th>
            <td>${alumno.dni}</td>
        </tr>
        <tr>
            <th scope="row">Nombre</th>
            <td>${alumno.nombre}</td>
        </tr>
        <tr>
            <th scope="row">Apellidos</th>
            <td>${alumno.apellido}</td>
        </tr>
        </tbody>
        </table>
    `;
    return html;
  }

function sedes() {

    if (document.getElementById('Empresa').value == "") {
        document.getElementById('Sede').innerHTML = "";
    }
    
    let empresa = document.getElementById('Empresa').value;

    let url = `http://localhost:8000/api/sedes/${empresa}`;
    let metodo = 'GET';

    if (empresa!="") {

        document.getElementById('Sede').innerHTML = '';

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
    
            let us = data.data;
            us.forEach(element => {
                // Generar el contenido HTML para mostrar los datos del usuario
                let se = generarOptionSede(element);
                // Mostrar los datos en el elemento HTML
                document.getElementById('Sede').innerHTML += se;            
            });
    
        })
        .catch(error => {
            // Manejar cualquier error en la petición
            console.log('Error:', error);
        });
    }
}

function generarOptionSede(sede) {
    let se = `
    <option value="${sede.nombre}">${sede.nombre}</option>
    `;
    return se;
}
function empresa() {
    

    let url = `http://localhost:8000/api/empresas`;
    let metodo = 'GET';



        document.getElementById('Sede').innerHTML = '';

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
    
            let us = data.data;
            us.forEach(element => {
                // Generar el contenido HTML para mostrar los datos del usuario
                let se = generarOptionEmpresa(element);
                // Mostrar los datos en el elemento HTML
                document.getElementById('Empresa').innerHTML += se;            
            });
    
        })
        .catch(error => {
            // Manejar cualquier error en la petición
            alert('No se ha podido ejecutar la actulización rellena campos');
        });
}
function generarOptionEmpresa(empresa) {
    let se = `
    <option value="${empresa.Nombre}">${empresa.Nombre}</option>
    `;
    return se;
}

function crearAsignacion() {

    let url = 'http://localhost:8000/api/asignacion';

    let urlParams = new URLSearchParams(window.location.search);

    let alumno = urlParams.get('dni');

    emp = document.getElementById('Empresa').value;
    es = document.getElementById('Estado').value;
    se = document.getElementById('Sede').value;


    const data = {
        dni_alumno: alumno,
        nom_empresa: emp,
        estado: es,
        sede: se,
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
  
        alert('Asiganación creada');

      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
}

function getCurriculum() {

    let urlParams = new URLSearchParams(window.location.search);
  
    let alumno = urlParams.get('dni');
    
    
  
    let url = `http://localhost:8000/api/cv/${alumno}`;
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
        
        // Generar el contenido HTML para mostrar los datos del usuario
        console.log(us);
  
            if (us.length === 0) {
              document.getElementById('existe').innerHTML += '<p><strong>No hay curriculum</strong></p>';  
            } else {
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
        <p><strong>Nombre del arhivo: ${cv.nombre}<strong></p>
    `;
    if(confirm('¿Hay un CV, quieres verlo?')){
      var win = window.open();
       win.document.write('<iframe style="width : 100%; height : 100% "  src="' + cv.ruta  + '"></iframe>');
    }
    return html
  }

  function cerrar() {
    if(confirm('Seguro que quieres cerrar sesión')){
      localStorage.clear();
      window.open('../index.html');
    }
  }