import { Manager } from './scripts/manager';
import { PokemonPage } from './scripts/PokemonPage';

const path = window.location.pathname;

window.addEventListener('load', () => {
  const contentDiv = document.getElementById('content') as HTMLElement;

  if (path === '/')
    initMainPage(contentDiv);
  else if (path === '/pokemon')
    initPokemonPage();
});

async function initMainPage(parenElement: HTMLElement) {
  const manager = new Manager(parenElement);
  manager.render();
}

async function initPokemonPage() {
  const idParam = window.location.search;
  const response = await fetch('http://localhost:4000/pokedata' + idParam);
  const data = await response.json();
  new PokemonPage(data);
}
