import { createProy, getAllProy, getProy, updateProy, deleteProy, deletePortfolio, isLoggedIn } from './data.js';
import { today, getImgFile } from './utilities.js';
// deletePortfolio();

// CRUD PROYECTOS 
let proyectos = getAllProy();

//:::::::::::::::::::::::::::::: //
//:::::::::::: READ :::::::::::: //
//:::::::::::::::::::::::::::::: //

const $proyectos = document.getElementById('proyectos');

 function populateProyectos() {
  let template = '';
  let adminCreateBtn = `<button class="button secondary" id="create-proy-btn" ><i class="icon i-plus"></i></button>`;
  template = `<h2 class="section-title"><span>Proyectos</span> ${isLoggedIn ? adminCreateBtn : ''}</h2>
      <div class="cards-container">
      `;

  for (let proyecto of proyectos) {

    let adminBtns = `
      <div class="admin-btns-ctn">
        <button id="edit-proy-${proyecto.id}" type="button" class="button button-info" ><i class="icon i-pen"></i></button>
        <button id="del-proy-${proyecto.id}" type="button" class="button button-delete"><i class="icon i-trash"></i></button>
      </div>`;

    let proy_id = 'proy_' + proyecto.id;

    let proyectoCard = `
      <div class="card" id="${proy_id}">
          ${isLoggedIn ? adminBtns : ''}
          <a href="${proyecto.url}">
            <img class="thumbnail" src="${proyecto.img}" alt="{imágen del proyecto}" >
          </a>
          <details>
            <summary> ${proyecto.nombre.toUpperCase()} - ${proyecto.anio} </summary>   
            <p>${proyecto.descripcion}</p>
          </details>
      </div>
      `;

      template += proyectoCard;
    };
    template += `</div>`; // End card-container

    $proyectos.innerHTML = template ;

    document.querySelector('#create-proy-btn').addEventListener('click',createProyUI);

    document.querySelectorAll('[id^="edit-proy-"]').forEach(proy => {
      proy.addEventListener('click', e => {
        let id = e.currentTarget.id.slice(9); 
        updateProyUI(id)    
       })
    })
   
    document.querySelectorAll('[id^="del-proy-"]').forEach(proy => {
      proy.addEventListener('click', e => {
        let id = e.currentTarget.id.slice(8);
        deleteProyUI(id)    
       })
    })

}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: CREATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function createProyUI() {

  let hoy = today();
  let anio = today().split('-')[0];

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="createProyForm">
            <h1 class="title">Crear proyecto</h2>

              <div class="form-group">
                <label for="nombre-proy">Nombre:</label>
                <input type="text" class="input input-text" id="nombre-proy" placeholder="Nombre del Proyecto">
              </div>

              <div class="form-group" >
                <label for="img">Miniatura:</label>
                <div>
                  <input type="text" class="input input-text" placeholder="Choose File"  id="img-src" > 
                  <!-- Image Thumbnail Here -->
                  </div>
              </div>

              <div class="form-group">
                <label for="anio">Año:</label>
                <input type="number" class="input input-number" placeholder="YYYY" min="1970" max="${anio}" step="1" id="anio" >
              </div>

              <div class="form-group">
                <label for="url">Link:</label>
                <input type="text" class="input input-text"  id="url" placeholder="https://www.ejemplo.com/">
              </div>

              <div class="form-group">
                <label for="descripcion">Descripción:</label>
                <textarea class="textarea" id="descripcion" placeholder="Descripción"></textarea>
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

    createProy(formData);
    deleteModal();
    populateProyectos();
  });
}


//:::::::::::::::::::::::::::::::: //
//:::::::::::: UPDATE :::::::::::: //
//:::::::::::::::::::::::::::::::: //

function updateProyUI(id) {

  let hoy = today();
  let proy = getProy(id);

  $modal.innerHTML = /*HTML*/`
      <div class="modal appear">
          <div class="form" id="updateProyForm">
            <h1 class="title">Actualizar proyecto</h2>
              <div class="form-group">
                <label for="id">Id:</label>
                <input type="text" class="input input-text" id="id" value="${proy.id}" readonly disabled>
              </div>

              <div class="form-group">
                <label for="titulo">Título:</label>
                <input type="text" class="input input-text"  id="titulo" value="${proy.titulo}">
              </div>

              <div class="form-group">
                <label for="institucion">Institución:</label>
                <input type="text" class="input input-text"  id="institucion" value="${proy.institucion}">
              </div>

              <div class="form-group" >
                <label for="img">Logo:</label>
                <div>
                  <input type="text" class="input input-text" placeholder="Choose File" value="${proy.img}"  id="img-src" > 
                  <!-- Image Thumbnail Here -->
                  </div>
              </div>

              <div class="form-group">
                <label for="inicio">Fecha de Inicio:</label>
                <input type="date" class="input input-date" value="${proy.inicio}" min="1970-01-01" max="${hoy}" id="inicio" >
              </div>
              
              <div class="form-group">
                <label for="fin">Fecha de Fin:</label>
                <input type="date" class="input input-date" value="${proy.fin}" min="1970-01-01" max="${hoy}" id="fin" >
              </div>

              <div class="form-group">
                <label for="promedio">Promedio:</label>
                <input type="text" class="input input-text"  id="promedio" value="${proy.promedio}">
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
    updateProy(formData);
    deleteModal();
    populateProyectos(); //TODO Mejorar: seleccionar y actualizar solo al elemento modificado 
  });
}


//:::::::::::::::::::::::::::::: //
//::::::::::: DELETE ::::::::::: //
//:::::::::::::::::::::::::::::: //

function deleteProyUI(id) {
  deleteProy(id);
  let $proy = document.querySelector(`#proy_${id}`);
  $proy.remove();
}

export { populateProyectos };