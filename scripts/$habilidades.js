import { createHab, getAllHab, getHab, updateHab, deleteHab, deletePortfolio, isLoggedIn } from './data.js';
import { today, getImgFile } from './utilities.js';
// deletePortfolio();
// CRUD ESTUDIOS 
let habilidades = getAllHab();

//:::::::::::::::::::::::::::::: //
//:::::::::::: READ :::::::::::: //
//:::::::::::::::::::::::::::::: //

const $habilidades = document.getElementById('habilidades');

function populateHabilidades() {
  let template = '';
  let adminCreateBtn = `<button class="button secondary" id="create-hab-btn" ><i class="icon i-plus"></i></button>`;
  template = `<h2 class="section-title"><span>Habilidades</span> ${isLoggedIn ? adminCreateBtn : ''}</h2>
  <div class="cards-container">
  `;

  for (let habilidad of habilidades) {

    let adminBtns = `
      <div class="admin-btns-ctn">
        <button id="edit-hab-${habilidad.id}" type="button" class="button button-info" > <i class="icon i-pen"></i></button>
        <button id="del-hab-${habilidad.id}" type="button" class="button button-delete"><i class="icon i-trash"></i></button>
      </div>`;

    let hab_id = 'hab_' + habilidad.id;

    let habilidadCard = `
      <div class="card" id="${hab_id}">
        <div>${isLoggedIn ? adminBtns : ''}</div>
        <div>
        <svg class="percent-circle" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" style="--percentage: ${habilidad.porcentaje};">
        <!-- ^ Add a number here -->
        <circle class="progress-background"></circle>
        <circle class="progress-bar"></circle>
        <text> ${habilidad.nombre}</text>
      </svg>
        </div>
      </div>
      `;

    template += habilidadCard;
  };

  template += `</div>`; // End card-container

  $habilidades.innerHTML = template;

  document.querySelector('#create-hab-btn').addEventListener('click', createHabUI);

  document.querySelectorAll('[id^="edit-hab-"]').forEach(hab => {
    hab.addEventListener('click', e => {
      let id = e.currentTarget.id.slice(9);
      updateHabUI(id)
    })
  })

  document.querySelectorAll('[id^="del-hab-"]').forEach(hab => {
    hab.addEventListener('click', e => {
      let id = e.currentTarget.id.slice(8);
      deleteHabUI(id)
    })
  })
}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: CREATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function createHabUI() {

  let hoy = today();

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="createHabForm">
            <h1 class="title">Crear habilidad</h2>

              <div class="form-group">
                <label for="nombre-hab">Nombre:</label>
                <input type="text" class="input input-text"  id="nombre-hab" >
              </div>

              <div class="form-group">
                <label for="porcentaje">Porcentaje:</label>
                <input type="number" class="input input-number"  id="porcentaje" >
              </div>

              <div class="form-group buttons">
                <button  class="button secondary" id="cancel-btn">Cancelar</button>
                <button class="button" id="create-btn">Crear</button>
              </div>
          </div>
      </div>`;

  let $cancelBtn = document.getElementById('cancel-btn');
  $cancelBtn.addEventListener('click', deleteModal);

  let $createBtn = document.getElementById('create-btn');

  $createBtn.addEventListener('click', () => {

    let formData = {
      nombre: document.getElementById('nombre-hab').value,
      porcentaje: document.getElementById('porcentaje').value,
    };

    createHab(formData);
    deleteModal();
    populateHabilidades();
  });
}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: UPDATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function updateHabUI(id) {

  let hoy = today();
  let hab = getHab(id);

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="updateHabForm">
            <h1 class="title">Actualizar habilidad</h2>
              <div class="form-group">
                <label for="id">Id:</label>
                <input type="text" class="input input-text" id="id" value="${hab.id}" readonly disabled>
              </div>

              <div class="form-group">
              <label for="nombre-hab">Nombre:</label>
              <input type="text" class="input input-text"  id="nombre-hab" >
            </div>

            <div class="form-group">
              <label for="porcentaje">Porcentaje:</label>
              <input type="number" class="input input-number"  id="porcentaje" >
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
      nombre: document.getElementById('nombre-hab').value,
      porcentaje: document.getElementById('porcentaje').value,
    };
    updateHab(formData);
    deleteModal();
    populateHabilidades(); //TODO Mejorar: seleccionar y actualizar solo al elemento modificado 
  });
}


//:::::::::::::::::::::::::::::: //
//::::::::::: DELETE ::::::::::: //
//:::::::::::::::::::::::::::::: //

function deleteHabUI(id) {
  deleteHab(id);
  let $hab = document.querySelector(`#hab_${id}`);
  $hab.remove();
}

export { populateHabilidades };