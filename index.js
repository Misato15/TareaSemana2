const fs = require('fs');

const RUTA='./DB/data.json'

const [,,parametro1,parametro2]=process.argv
const [,accion] = parametro1.split('=')
if (parametro2){
    var actividad = parametro2.split('=')
}

switch(accion){
    case '1':
        //Crea un archivo JSON Vacio
        crearVacioJSON()
        break
    case '2':
        //Escribir en un archivo
        crearNuevoRegistro()
        break
    case '3':
        //Sobrescribir el contenido de un archivo
        modificarRegistro()
        break
    case '4':
        //Eliminar archivo
        eliminarRegistro()
        break
    case '5':
        //Leer archivo
        obtenerRegistros()
        break
    case '6':
        //Buscar registro
        buscarRegistro()
        break
    default:
        console.log('Opcion incorrecta')
        break
}

  function buscarRegistro(actividad) {
    const jsonString = fs.readFileSync(RUTA);
    const actividades = JSON.parse(jsonString);
    return (
      actividades.find((e) => e.actividad === actividad) ??
      "No existe el registro"
    );
  }

function crearVacioJSON(){
    const file = fs.openSync(RUTA, 'w', 0o666);
    console.log("Archivo creado");
    }

function crearNuevoRegistro(actividad, categoria, valor, disponible) {
    const jsonString = fs.readFileSync(RUTA);
    const actividades = JSON.parse(jsonString);
    actividades.push({
      actividad,
      categoria,
      valor,
      disponible,
    });
    const nuevaActividad = JSON.stringify(actividades, null, 2);
    fs.writeFileSync(RUTA, nuevaActividad);
  }


function modificarRegistro(actividad, categoria, valor, disponible) {
    const jsonString = fs.readFileSync(RUTA);
    const actividades = JSON.parse(jsonString);
  
    const indice = actividades.findIndex((e) => e.actividad === actividad);
    const modificado = {
      actividad,
      categoria,
      valor,
      disponible,
    };
    actividades[indice] = modificado;
    const modificadoActividad = JSON.stringify(actividades, null, 2);
    fs.writeFileSync(RUTA, modificadoActividad);
  }

  function eliminarRegistro(actividad){
    const jsonString = fs.readFileSync(RUTA);
    const actividades = JSON.parse(jsonString);
    const flitrado = actividades.filter((e)=> e.actividad !== actividad)
    
    const eliminadoActividad = JSON.stringify(flitrado,null, 2)
    fs.writeFileSync('./data.json',eliminadoActividad)
  }

  function obtenerRegistros(){
    const jsonString = fs.readFileSync(RUTA);
    const actividades = JSON.parse(jsonString);
    console.log(actividades)
  }   
