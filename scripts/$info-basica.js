import { getInfoBasica, updateInfoBasica, deletePortfolio, isLoggedIn } from './data.js';
import { today, getImgFile, getDomainWithoutSuffix } from './utilities.js';
// deletePortfolio();
// CRUD INFO BASICA 
let { id,
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
  direccion } = getInfoBasica();


//:::::::::::::::::::::::::::::: //
//:::::::::::: READ :::::::::::: //
//:::::::::::::::::::::::::::::: //

const $nombre = document.querySelector('#nombre');
const $fechaDeNacimiento = document.querySelector('#fecha');
const $nacionalidad = document.querySelector('#nacionalidad');
const $mail = document.querySelector('#mail');
const $sobreMi = document.querySelector('#sobre-mi');
const $ocupacion = document.querySelector('#ocupacion');
const $imgCabecera = document.querySelector('#img-cab');
const $imgPerfil = document.querySelector('#img-perfil');
const $redesSociales = document.querySelector('#redes-sociales');

function populateInfoBasica() {
  let adminBtns = `
      <div class="admin-btns-ctn">
        <button id="edit-ib" type="button" class="button button-info" > <i class="icon i-pen"></i> </button>
      </div>`;
  $nombre.innerHTML = `<span>${nombre} ${apellido} </span> ${isLoggedIn ? adminBtns : ''}`;
  $fechaDeNacimiento.innerText = fechaDeNacimiento;
  $nacionalidad.innerText = nacionalidad;
  $mail.innerText = mail;
  $sobreMi.innerText = sobreMi;
  $ocupacion.innerText = ocupacion;
  $imgCabecera.setAttribute('src', imgCabecera);
  $imgPerfil.setAttribute('src', imgPerfil);

  let template = '';

  for (let redSoc of redesSociales) {
    template += `<a href="${redSoc}" target="_blank" rel="noopener noreferrer"> 
      <i class="icon i-${getDomainWithoutSuffix(redSoc)}"></i>
    </a>`;
  };

  $redesSociales.innerHTML = template;

  document.querySelector('#edit-ib').addEventListener('click', updateIBUI);

}

 
//:::::::::::::::::::::::::::::::: //
//:::::::::::: UPDATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function updateIBUI() {

  let hoy = today();

  let adminCreateBtn = `<button class="button secondary" id="create-red-soc-btn" ><i class="icon i-plus"></i></button>`;
  let adminDelBtn = ``;
  let social = redesSociales.reduce((acc, redSoc, i) => {
    return acc + `
        <div class="form-group" id="red-soc-form-${i}">
          <a href="${redSoc}" target="_blank" rel="noopener noreferrer"> 
             <i class="bi-${getDomainWithoutSuffix(redSoc)}"></i>
           </a>
          <input type="text" class="input input-text"  id="red-social-${i}" value="${redSoc}">
          <button class="button button-delete" id="del-red-soc-${i}" ><i class="icon i-trash"></i></button>
          </div>`;
  }, '');


  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="updateEstForm">
            <h1 class="title">Actualizar Info Básica</h2>

              <div class="form-group">
                <label for="nombre-form">Nombre:</label>
                <input type="text" class="input input-text"  id="nombre-form" value="${nombre}">
              </div>
              
              <div class="form-group">
                <label for="apellido-form">Apellido:</label>
                <input type="text" class="input input-text"  id="apellido-form" value="${apellido}">
              </div>

              <div class="form-group">
                <label for="fecha-form">Fecha de nacimiento:</label>
                <input type="date" class="input input-date" value="${fechaDeNacimiento}" min="1970-01-01" max="${hoy}" id="fecha-form" >
              </div>

              <div class="form-group">
                <label for="nacionalidad-form">Nacionalidad:</label>
                <input type="text" class="input input-text"  id="nacionalidad-form" value="${nacionalidad}">
              </div>
              
              <div class="form-group">
              <label for="mail-form">Mail:</label>
                <input type="email" class="input input-text" pattern=".+@globex\.com" size="30" id="mail-form" value="${mail}">
                </div>
                
                <div class="form-group">
                  <label for="ocupacion-form">Ocupación:</label>
                  <input type="text" class="input input-text"  id="ocupacion-form" value="${ocupacion}">
                </div>
              
                <div class="form-group">
                <label for="sobre-mi">Descripción:</label>
                <textarea class="textarea" id="sobre-mi-form" placeholder="Sobre mi...">${sobreMi}</textarea>
              </div>

              <div class="form-group" >
                <label for="img-cab-form">Imagen de Cabecera:</label>
                <div>
                  <input type="text" class="input input-text" placeholder="Choose File" value="${imgCabecera}"  id="img-cab-form" > 
                  <!-- Image Thumbnail Here -->
                  </div>
              </div>
              
              <div class="form-group" >
              <label for="img-perfil-form">Imagen de Cabecera:</label>
              <div>
              <input type="text" class="input input-text" placeholder="Choose File" value="${imgPerfil}"  id="img-perfil-form" > 
              <!-- Image Thumbnail Here -->
              </div>
              </div>
              
              <div class="form-group" >
              <label for="redes">Redes Sociales: </label> 

              ${adminCreateBtn}
              </div>
              <div id="social-form-ctn">
              ${social}
              </div>
              <div class="form-group buttons">
                <button  class="button secondary" id="cancel-btn">Cancelar</button>
                <button class="button" id="update-btn">Modificar</button>
              </div>
          </div>
      </div>`;

  const $cancelBtn = document.getElementById('cancel-btn');
  $cancelBtn.addEventListener('click', deleteModal);
  const $createRedSocBtn = document.getElementById('create-red-soc-btn');
  $createRedSocBtn.addEventListener('click', addRedSocUI);

  document.querySelectorAll('[id^="del-red-soc-"]').forEach(red => {
    red.addEventListener('click', e => {
      let id = e.currentTarget.id.slice(12);
      deleteRedSocUI(id)
    })
  })

  const $updateBtn = document.getElementById('update-btn');
  $updateBtn.addEventListener('click', () => {
    const formData = {
      nombre: document.querySelector('#nombre-form').value,
      apellido: document.querySelector('#apellido-form').value,
      fechaDeNacimiento: document.querySelector('#fecha-form').value,
      nacionalidad: document.querySelector('#nacionalidad-form').value,
      mail: document.querySelector('#mail-form').value,
      sobreMi: document.querySelector('#sobre-mi-form').value,
      ocupacion: document.querySelector('#ocupacion-form').value,
      imgCabecera: document.querySelector('#img-cab-form').value,
      imgPerfil: document.querySelector('#img-perfil-form').value,
      redesSociales: document.querySelectorAll('[id^="red-social-"]').map(rs => rs.value)
    };
    updateEst(formData);
    deleteModal();
    populateEstudios(); //TODO Mejorar: seleccionar y actualizar solo al elemento modificado 
  });
}


//:::::::::::::::::::::::::::::: //
//::: ADD & DELETE RED SOCIAL ::: //
//:::::::::::::::::::::::::::::: //

function deleteRedSocUI(id) {
  let $red = document.querySelector(`#red-soc-form-${id}`);
  $red.remove();
}

function addRedSocUI() {
  let $socialFormCtn = document.querySelector(`#social-form-ctn`);
  let i = $socialFormCtn.children.length;
  let $div = document.createElement("div");
  let del_id = `del-red-soc-${i}`
  $div.setAttribute('class', 'form-group');
  $div.setAttribute('id', `red-soc-form-${i}`);

  $div.innerHTML = `
  <label>Nuevo link: </label>
  <input type="text" class="input input-text"  id="red-social-${i}" >
  <button class="button button-delete" id="${del_id}" ><i class="icon i-trash"></i></button> `;
  $socialFormCtn.prepend($div);
  document.getElementById(del_id).addEventListener('click', e => {
    let id = e.currentTarget.id.slice(12);
    deleteRedSocUI(id)
  })
}

export { populateInfoBasica };