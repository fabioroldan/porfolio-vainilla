import { createExp, getAllExp, getExp, updateExp, deleteExp, deletePortfolio, isLoggedIn } from './data.js';
import { today, getImgFile } from './utilities.js';

// CRUD EXPERIENCIA 
let experiences = getAllExp();

//:::::::::::::::::::::::::::::: //
//:::::::::::: READ :::::::::::: //
//:::::::::::::::::::::::::::::: //


const $experiencia = document.getElementById('experiencia');

 function populateExperience() {
  let template = '';
  let adminCreateBtn = `<button class="button secondary" id="create-exp-btn" ><i class="icon i-plus"></i></button>`;
  template = `<h2 class="section-title"><span>Experiencia</span> ${isLoggedIn ? adminCreateBtn : ''}</h2>
  <div class="cards-container">
  `;
  //onclick="updateForm(${experience.id})"
  for (let experience of experiences) {

    let adminBtns = `
      <div class="admin-btns-ctn">
        <button id="edit-exp-${experience.id}" type="button" class="button button-info" > <i class="icon i-pen"></i></button>
        <button id="del-exp-${experience.id}" type="button" class="button button-delete"><i class="icon i-trash"></i></button>
      </div>`;

    let exp_id = 'exp_' + experience.id;

    let experienciaCard = `
      <div class="card" id="${exp_id}">
          ${isLoggedIn ? adminBtns : ''}
          <div class="visual">
            <img class="logo" src="${experience.img}" alt="logo de ${experience.institucion}">
          </div>
            <div>
            <h3> ${experience.posicion.toUpperCase()}</h3>
            <p>${experience.inicio} - ${experience.fin}</p>
            <p>lugar: ${experience.lugar} </p>
            <p> ${experience.descripcion} </p>
          </div>
        </div>
      `;

      template += experienciaCard;
    };
    template += `</div>`; // End card-container

    $experiencia.innerHTML = template ;

    document.querySelector('#create-exp-btn').addEventListener('click',createExpUI);

    document.querySelectorAll('[id^="edit-exp-"]').forEach(exp => {
      exp.addEventListener('click', e => {
        let id = e.currentTarget.id.slice(9); 
        updateExpUI(id)    
       })
    })
   
    document.querySelectorAll('[id^="del-exp-"]').forEach(exp => {
      exp.addEventListener('click', e => {
        let id = e.currentTarget.id.slice(8);
        deleteExpUI(id)    
       })
    })

}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: CREATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function createExpUI() {

  let hoy = today();

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="createExpForm">
            <h1 class="title">Crear experiencia</h2>

              <div class="form-group">
                <label for="posicion">Posición:</label>
                <input type="text" class="input input-text"  id="posicion">
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
                <label for="modo">Modo:</label>
                <input type="text" class="input input-text"  id="modo" >
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
                <label for="lugar">Lugar:</label>
                <input type="text" class="input input-text"  id="lugar" placeholder="lugar">
              </div>

              <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <textarea class="textarea" id="descripcion" placeholder="Descripcion"></textarea>
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
      posicion: document.getElementById('posicion').value,
      institucion: document.querySelector('#institucion').value,
      img: document.querySelector('#img-src').value,
      modo: document.querySelector('#modo').value,
      inicio: document.querySelector('#inicio').value,
      fin: document.querySelector('#fin').value,
      lugar: document.querySelector('#lugar').value,
      descripcion: document.querySelector('#descripcion').value,
    };

    createExp(formData);
    deleteModal();
    populateExperience();
  });
}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: UPDATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function updateExpUI(id) {

  let hoy = today();
  let exp = getExp(id);

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="updateExpForm">
            <h1 class="title">Actualizar experiencia</h2>
              <div class="form-group">
                <label for="id">Id:</label>
                <input type="text" class="input input-text" id="id" value="${exp.id}" readonly disabled>
              </div>

              <div class="form-group">
                <label for="posicion">Posición:</label>
                <input type="text" class="input input-text"  id="posicion" value="${exp.posicion}">
              </div>

              <div class="form-group">
                <label for="institucion">Institución:</label>
                <input type="text" class="input input-text"  id="institucion" value="${exp.institucion}">
              </div>

              <div class="form-group" >
                <label for="img">Logo:</label>
                <div>
                  <input type="text" class="input input-text" placeholder="Choose File" value="${exp.img}"  id="img-src" > 
                  <!-- Image Thumbnail Here -->
                  </div>
              </div>

              <div class="form-group">
                <label for="modo">Modo:</label>
                <input type="text" class="input input-text"  id="modo" value="${exp.modo}">
              </div>

              <div class="form-group">
                <label for="inicio">Fecha de Inicio:</label>
                <input type="date" class="input input-date" value="${exp.inicio}" min="1970-01-01" max="${hoy}" id="inicio" >
              </div>
              
              <div class="form-group">
                <label for="fin">Fecha de Fin:</label>
                <input type="date" class="input input-date" value="${exp.fin}" min="1970-01-01" max="${hoy}" id="fin" >
              </div>

              <div class="form-group">
                <label for="lugar">Lugar:</label>
                <input type="text" class="input input-text"  id="lugar" value="${exp.lugar}">
              </div>
              <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <textarea class="textarea" id="descripcion">${exp.descripcion}</textarea>
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
      posicion: document.querySelector('#posicion').value,
      institucion: document.querySelector('#institucion').value,
      img: document.querySelector('#img-src').value,
      modo: document.querySelector('#modo').value,
      inicio: document.querySelector('#inicio').value,
      fin: document.querySelector('#fin').value,
      lugar: document.querySelector('#lugar').value,
      descripcion: document.querySelector('#descripcion').value,
    };
    updateExp(formData);
    deleteModal();
    populateExperience(); //TODO Mejorar: seleccionar y actualizar solo al elemento modificado 
  });
}


//:::::::::::::::::::::::::::::: //
//::::::::::: DELETE ::::::::::: //
//:::::::::::::::::::::::::::::: //

function deleteExpUI(id) {
  deleteExp(id);
  let $exp = document.querySelector(`#exp_${id}`);
  $exp.remove();
}

export { populateExperience };