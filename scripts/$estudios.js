import { createEst, getAllEst, getEst, updateEst, deleteEst, deletePortfolio, isLoggedIn } from './data.js';
import { today, getImgFile } from './utilities.js';
// deletePortfolio();
// CRUD ESTUDIOS 
let estudios = getAllEst();

//:::::::::::::::::::::::::::::: //
//:::::::::::: READ :::::::::::: //
//:::::::::::::::::::::::::::::: //

const $estudio = document.getElementById('estudios');

function populateEstudios() {
  let template = '';
  let adminCreateBtn = `<button class="button secondary" id="create-est-btn" ><i class="icon i-plus"></i></button>`;
  template = `<h2 class="section-title"><span>Estudio</span> ${isLoggedIn ? adminCreateBtn : ''}</h2>
    <div class="cards-container">
  `;

  for (let estudio of estudios) {

    let adminBtns = `
      <div class="admin-btns-ctn">
        <button id="edit-est-${estudio.id}" type="button" class="button button-info" > <i class="icon i-pen"></i></button>
        <button id="del-est-${estudio.id}" type="button" class="button button-delete"><i class="icon i-trash"></i></button>
      </div>`;

    let est_id = 'est_' + estudio.id;

    let estudioCard = `
      <div class="card" id="${est_id}">
          ${isLoggedIn ? adminBtns : ''}
          <div class="visual">
            <img class="logo" src="${estudio.img}" alt="logo de ${estudio.institucion}">
            <h6> ${estudio.institucion.toUpperCase()}</h6>
          </div>
        <div>
          <h3> ${estudio.titulo}</h3>
          <p>${estudio.inicio} - ${estudio.fin}</p>
          <p> ${estudio.promedio} </p>
        </div>
      </div>
      `;

    template += estudioCard;
  };

  template += `</div>`; // End card-container
  $estudio.innerHTML = template;

  document.querySelector('#create-est-btn').addEventListener('click', createEstUI);

  document.querySelectorAll('[id^="edit-est-"]').forEach(est => {
    est.addEventListener('click', e => {
      let id = e.currentTarget.id.slice(9);
      updateEstUI(id)
    })
  })

  document.querySelectorAll('[id^="del-est-"]').forEach(est => {
    est.addEventListener('click', e => {
      let id = e.currentTarget.id.slice(8);
      deleteEstUI(id)
    })
  })

}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: CREATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function createEstUI() {

  let hoy = today();

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="createEstForm">
            <h1 class="title">Crear estudio</h2>

              <div class="form-group">
                <label for="titulo">Título:</label>
                <input type="text" class="input input-text"  id="titulo" >
              </div>

              <div class="form-group">
                <label for="institucion">Institución:</label>
                <input type="text" class="input input-text"  id="institucion" >
              </div>

              <div class="form-group" >
                <label for="img">Logo:</label>
                <div>
                  <input type="text" class="input input-text" placeholder="Choose File"  id="img-src" > 
                  <!-- Image Thumbnail Here -->
                  </div>
              </div>

              <div class="form-group">
                <label for="inicio">Fecha de Inicio:</label>
                <input type="date" class="input input-date" min="1970-01-01" max="${hoy}" id="inicio" >
              </div>
              
              <div class="form-group">
                <label for="fin">Fecha de Fin:</label>
                <input type="date" class="input input-date" min="1970-01-01" max="${hoy}" id="fin" >
              </div>

              <div class="form-group">
                <label for="promedio">Promedio:</label>
                <input type="number" class="input input-number" id="promedio" placeholder="promedio">
              </div>

              <div class="form-group buttons">
                <button  class="button secondary" id="cancel-btn">Cancelar</button>
                <button class="button" id="create-btn">Crear</button>
              </div>
          </div>
      </div>`;

  let $cancelBtn = document.getElementById('cancel-btn');
  $cancelBtn.addEventListener('click', deleteModal);

  let $getFileBtn = document.getElementById('img-src');
  $getFileBtn.addEventListener('dblclick', getImgFile);

  let $createBtn = document.getElementById('create-btn');

  $createBtn.addEventListener('click', () => {

    let formData = {
      institucion: document.getElementById('institucion').value,
      titulo: document.getElementById('titulo').value,
      img: document.getElementById('img-src').value,
      inicio: document.getElementById('inicio').value,
      fin: document.getElementById('fin').value,
      promedio: document.getElementById('promedio').value
    };
 
    createEst(formData);
    deleteModal();
    populateEstudios();
  });
}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: UPDATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function updateEstUI(id) {

  let hoy = today();
  let est = getEst(id);

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="updateEstForm">
            <h1 class="title">Actualizar estudio</h2>
              <div class="form-group">
                <label for="id">Id:</label>
                <input type="text" class="input input-text" id="id" value="${est.id}" readonly disabled>
              </div>

              <div class="form-group">
                <label for="titulo">Título:</label>
                <input type="text" class="input input-text"  id="titulo" value="${est.titulo}">
              </div>

              <div class="form-group">
                <label for="institucion">Institución:</label>
                <input type="text" class="input input-text"  id="institucion" value="${est.institucion}">
              </div>

              <div class="form-group" >
                <label for="img">Logo:</label>
                <div>
                  <input type="text" class="input input-text" placeholder="Choose File" value="${est.img}"  id="img-src" > 
                  <!-- Image Thumbnail Here -->
                  </div>
              </div>

              <div class="form-group">
                <label for="inicio">Fecha de Inicio:</label>
                <input type="date" class="input input-date" value="${est.inicio}" min="1970-01-01" max="${hoy}" id="inicio" >
              </div>
              
              <div class="form-group">
                <label for="fin">Fecha de Fin:</label>
                <input type="date" class="input input-date" value="${est.fin}" min="1970-01-01" max="${hoy}" id="fin" >
              </div>

              <div class="form-group">
                <label for="promedio">Promedio:</label>
                <input type="text" class="input input-text"  id="promedio" value="${est.promedio}">
              </div>

              <div class="form-group buttons">
                <button  class="button secondary" id="cancel-btn">Cancelar</button>
                <button class="button" id="update-btn">Modificar</button>
              </div>
          </div>
      </div>`;

  const $cancelBtn = document.getElementById('cancel-btn');
  $cancelBtn.addEventListener('click', deleteModal);

  const $getFileBtn = document.getElementById('img-src');
  $getFileBtn.addEventListener('dblclick', getImgFile);

  const $updateBtn = document.getElementById('update-btn');
  $updateBtn.addEventListener('click', () => {
    const formData = {
      id: document.querySelector('#id').value,
      titulo: document.querySelector('#titulo').value,
      institucion: document.querySelector('#institucion').value,
      img: document.querySelector('#img-src').value,
      inicio: document.querySelector('#inicio').value,
      fin: document.querySelector('#fin').value,
      promedio: document.querySelector('#promedio').value,
    };
    updateEst(formData);
    deleteModal();
    populateEstudios(); //TODO Mejorar: seleccionar y actualizar solo al elemento modificado 
  });
}


//:::::::::::::::::::::::::::::: //
//::::::::::: DELETE ::::::::::: //
//:::::::::::::::::::::::::::::: //

function deleteEstUI(id) {
  deleteEst(id);
  let $est = document.querySelector(`#est_${id}`);
  $est.remove();
}

export { populateEstudios };