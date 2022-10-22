import loginData from '../data/login.json' assert {type: 'json'};
import { today } from './utilities.js';

import { populateExperience } from './$experiencia.js';
import { populateEstudios } from './$estudios.js';
import { populateHabilidades } from './$habilidades.js';
import { populateIdiomas } from './$idiomas.js';
import { populateProyectos } from './$proyectos.js';
import { downloadPortfolio, deletePortfolio, isLoggedIn } from './data.js';
import { populateInfoBasica } from './$info-basica.js';


updateView();

if (isLoggedIn == false) {
  $downloadBtn.style.display = 'none'
}

const $downloadBtn = document.getElementById('download-json');
$downloadBtn.addEventListener('click', downloadPortfolio);
const $resetBtn = document.getElementById('reset');
$resetBtn.addEventListener('click', deletePortfolio);

function updateView() {
  populateInfoBasica();
  populateHabilidades();
  populateIdiomas();
  populateExperience();
  populateEstudios();
  populateProyectos();
}
