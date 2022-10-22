//Cargar json
import data from '../data/data.json' assert {type: 'json'}; //valor por default

let isLoggedIn = true;
// deletePortfolio()

let portfolioData = read();

function getMaxId(arr) {

  return Math.max(...arr.map(obj => obj.id));
}

function getPortfolio() {
  return portfolioData;
}

////////////////////////////////////         
// ::::: INFORMACION BASICA ::::: //
////////////////////////////////////

// Read
function getInfoBasica() {

  let { id, nombre, apellido, fechaDeNacimiento, nacionalidad, mail, sobreMi, ocupacion, imgCabecera, imgPerfil, redesSociales, direccion } = portfolioData.infoBasica[0];

  return {
    id,
    nombre,
    apellido,
    fechaDeNacimiento,
    nacionalidad,
    mail,
    sobreMi,
    ocupacion,
    imgCabecera,
    imgPerfil,
    redesSociales,
    direccion
  }

}

// Update 
function updateInfoBasica(bas) {
  portfolioData.id = bas.id;
  portfolioData.nombre = bas.nombre;
  portfolioData.apellido = bas.apellido;
  portfolioData.fechaDeNacimiento = bas.fechaDeNacimiento;
  portfolioData.nacionalidad = bas.nacionalidad;
  portfolioData.mail = bas.mail;
  portfolioData.sobreMi = bas.sobreMi;
  portfolioData.ocupacion = bas.ocupacion
  portfolioData.imgCabecera = bas.imgCabecera;
  portfolioData.imgPerfil = bas.Perfil;
  portfolioData.redesSociales = bas.redesSociales;
  portfolioData.direccion = bas.direccion;

  save();
}

////////////////////////////////////         
// :::::: CRUD EXPERIENCIAS :::::: //
////////////////////////////////////

// Create
function createExp(exp) {

  let new_id = getMaxId(portfolioData.experiencias) + 1;
  exp.id = new_id;
  portfolioData.experiencias.push(exp);

  save();
}

// Read
function getAllExp() {
  return portfolioData.experiencias;
}

function getExp(id) {
  return portfolioData.experiencias.find(experience => experience.id == id)
}

// Update 
function updateExp(exp) {
  let oldExp = getExp(exp.id);
  oldExp.posicion = exp.posicion;
  oldExp.institucion = exp.institucion;
  oldExp.img = exp.img;
  oldExp.modo = exp.modo;
  oldExp.inicio = exp.inicio;
  oldExp.fin = exp.fin;
  oldExp.tiempoTranscurrido = exp.tiempoTranscurrido;
  oldExp.lugar = exp.lugar;
  oldExp.descripcion = exp.descripcion;
  save();
}

// Delete
function deleteExp(id) {
  portfolioData.experiencias = portfolioData.experiencias.filter(exp => exp.id != id);
  save();
}


////////////////////////////////////         
// ::::::: CRUD ESTUDIOS :::::::: //
////////////////////////////////////

// Create
function createEst(est) {
  let new_id = getMaxId(portfolioData.estudios) + 1;
  est.id = new_id;
  portfolioData.estudios.push(est);
  save();
}

// Read
function getAllEst() {
  return portfolioData.estudios;
}

function getEst(id) {
  return portfolioData.estudios.find(est => est.id == id)
}

// Update 
function updateEst(est) {
  let oldEst = getEst(est.id);
  oldEst.institucion = est.institucion;
  oldEst.titulo = est.titulo;
  oldEst.img = est.img;
  oldEst.carrera = est.carrera;
  oldEst.puntaje = est.puntaje;
  oldEst.inicio = est.inicio;
  oldEst.fin = est.fin;
  save();
}

// Delete
function deleteEst(id) {
  portfolioData.estudios = portfolioData.estudios.filter(est => est.id != id);
  save();
}


////////////////////////////////////         
// ::::::: CRUD HABILIDADES :::::::: //
////////////////////////////////////

// Create
function createHab(hab) {
  let new_id = getMaxId(portfolioData.habilidades) + 1;
  hab.id = new_id;
  portfolioData.habilidades.push(hab);
  save();
}

// Read
function getAllHab() {
  return portfolioData.habilidades;
}

function getHab(id) {
  return portfolioData.habilidades.find(hab => hab.id == id)
}

// Update 
function updateHab(hab) {
  let oldHab = getHab(hab.id);
  oldHab.nombre = hab.nombre;
  oldHab.porcentaje = hab.porcentaje;
  save();
}

// Delete
function deleteHab(id) {
  portfolioData.habilidades = portfolioData.habilidades.filter(hab => hab.id != id);
  save();
}


////////////////////////////////////         
// ::::::: CRUD IDIOMAS :::::::: //
////////////////////////////////////

// Create
function createIdio(idio) {
  let new_id = getMaxId(portfolioData.idiomas) + 1;
  idio.id = new_id;
  portfolioData.idiomas.push(idio);
  save();
}

// Read
function getAllIdio() {
  return portfolioData.idiomas;
}

function getIdio(id) {
  return portfolioData.idiomas.find(idio => idio.id == id)
}

// Update 
function updateIdio(idio) {
  let oldIdio = getIdio(idio.id);
  oldIdio.nombre = idio.nombre;
  oldIdio.porcentaje = idio.porcentaje;
  save();
}

// Delete
function deleteIdio(id) {
  portfolioData.idiomas = portfolioData.idiomas.filter(idio => idio.id != id);
  save();
}

////////////////////////////////////         
// ::::::: CRUD PROYECTOS :::::::: //
////////////////////////////////////

// Create
function createProy(proy) {
  let new_id = getMaxId(portfolioData.proyectos) + 1;
  proy.id = new_id;
  portfolioData.proyectos.push(proy);
  save();
}

// Read
function getAllProy() {
  return portfolioData.proyectos;
}

function getProy(id) {
  return portfolioData.proyectos.find(proy => proy.id == id)
}

// Update 
function updateProy(proy) {
  let oldProy = getProy(proy.id);
  oldProy.nombre = proy.nombre;
  oldProy.inicio = proy.inicio;
  oldProy.fin = proy.fin;
  oldProy.url = proy.url;
  oldProy.descripcion = proy.descripcion;
  save();
}

// Delete
function deleteProy(id) {
  portfolioData.proyectos = portfolioData.proyectos.filter(proy => proy.id != id);
  save();
}

////////////////////////////////////         
// ::::::: PERCISTENCIA ::::::: //
////////////////////////////////////


// Con localstorage

 function read() {
  if (!localStorage.getItem('portfolioData')) {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }
  return JSON.parse(localStorage.getItem('portfolioData'));
}

function save() {
  localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

function deletePortfolio() {
  // Clear localStorage items 
  localStorage.clear();
  location.reload();
};

// Bajar archivo

function downloadPortfolio() {
  const a = document.createElement("a");
  const data = JSON.stringify(portfolioData);
  const file = new Blob([data], { type: "application/json"});
  a.href = URL.createObjectURL(file);
  a.download = "data.json";
  a.click();
}


export {
  getPortfolio,
  deletePortfolio,
  downloadPortfolio,
  isLoggedIn,
  //Info Básica
  getInfoBasica,
  updateInfoBasica,
  // Experiencias
  createExp,
  getAllExp,
  getExp,
  updateExp,
  deleteExp,
  // Estudios
  createEst,
  getAllEst,
  getEst,
  updateEst,
  deleteEst,
  // Habilidades
  createHab,
  getAllHab,
  getHab,
  updateHab,
  deleteHab,
   // Idiomas
   createIdio,
   getAllIdio,
   getIdio,
   updateIdio,
   deleteIdio,
  // Proyectos
  createProy,
  getAllProy,
  getProy,
  updateProy,
  deleteProy,
};
