import { createIdio, getAllIdio, getIdio, updateIdio, deleteIdio, deletePortfolio, isLoggedIn } from './data.js';
import { today, getImgFile } from './utilities.js';
// deletePortfolio();
// CRUD IDIOMAS 
let idiomas = getAllIdio();

//:::::::::::::::::::::::::::::: //
//:::::::::::: READ :::::::::::: //
//:::::::::::::::::::::::::::::: //

const $idiomas = document.getElementById('idiomas');

 function populateIdiomas() {
  let template = '';
  let adminCreateBtn = `<button class="button secondary" id="create-idio-btn" ><i class="icon i-plus"></i></button>`;
  template = `<h2 class="section-title"><span>Idiomas</span> ${isLoggedIn ? adminCreateBtn : ''}</h2>
  <div class="cards-container">
  `;
  for (let idioma of idiomas) {

    let adminBtns = `
      <div class="admin-btns-ctn">
        <button id="edit-idio-${idioma.id}" type="button" class="button button-info" > <i class="icon i-pen"></i></button>
        <button id="del-idio-${idioma.id}" type="button" class="button button-delete"><i class="icon i-trash"></i></button>
      </div>`;

    let idio_id = 'idio_' + idioma.id;

    let idiomaCard = `
      <div class="card" id="${idio_id}">
        <div>${isLoggedIn ? adminBtns : ''}</div>
        <div>
        <h4>${idioma.nombre.toUpperCase()}:</h4>
        <progress class="progress" max="100" value="${idioma.porcentaje}"> ${idioma.porcentaje}% </progress>
        </div>
      </div>
      `;

      template += idiomaCard;
    };
    template += `</div>`; // End card-container

    $idiomas.innerHTML = template ;

    document.querySelector('#create-idio-btn').addEventListener('click',createIdioUI);

    document.querySelectorAll('[id^="edit-idio-"]').forEach(idio => {
      idio.addEventListener('click', e => {
        let id = e.currentTarget.id.slice(9); 
        updateIdioUI(id)    
       })
    })
   
    document.querySelectorAll('[id^="del-idio-"]').forEach(idio => {
      idio.addEventListener('click', e => {
        let id = e.currentTarget.id.slice(8);
        deleteIdioUI(id)    
       })
    })

}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: CREATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function createIdioUI() {

  let hoy = today();

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="createIdioForm">
            <h1 class="title">Crear idioma</h2>

              <div class="form-group">
                <label for="nombre-idio">Nombre:</label>
                <input type="text" class="input input-text"  id="nombre-idio" >
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
      nombre: document.getElementById('nombre-idio').value,
      porcentaje: document.getElementById('porcentaje').value,
    };

    createIdio(formData);
    deleteModal();
    populateIdiomas();
  });
}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: UPDATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function updateIdioUI(id) {

  let hoy = today();
  let idio = getIdio(id);

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="updateIdioForm">
            <h1 class="title">Actualizar idioma</h2>
              <div class="form-group">
                <label for="id">Id:</label>
                <input type="text" class="input input-text" id="id" value="${idio.id}" readonly disabled>
              </div>

              <div class="form-group">
              <label for="nombre-idio">Nombre:</label>
              <input type="text" class="input input-text"  id="nombre-idio" >
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
      nombre: document.getElementById('nombre-idio').value,
      porcentaje: document.getElementById('porcentaje').value,
    };
    updateIdio(formData);
    deleteModal();
    populateIdiomas(); //TODO Mejorar: seleccionar y actualizar solo al elemento modificado 
  });
}


//:::::::::::::::::::::::::::::: //
//::::::::::: DELETE ::::::::::: //
//:::::::::::::::::::::::::::::: //

function deleteIdioUI(id) {
  deleteIdio(id);
  let $idio = document.querySelector(`#idio_${id}`);
  $idio.remove();
}

export { populateIdiomas };