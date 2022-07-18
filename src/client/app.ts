import { Manager } from "./scripts/manager";
import { PokemonPage } from "./scripts/PokemonPage";

const path = window.location.pathname;

window.addEventListener('load', () => {
  const contentDiv = document.getElementById('content') as HTMLElement;

  if (path === '/')
    initMainPage(contentDiv);
  else if (path === '/pokemon')
    initPokemonPage();
});

async function initMainPage(parenElement: HTMLElement) {
  const data = await getPokeData();
  const manager = new Manager(parenElement, data);
  manager.render();
}

function initPokemonPage() {
  const idParam: number = Number(window.location.search.slice(4));
  let dataArray = localStorage.getItem('pokeDataArray');
  if (dataArray !== null) {
    dataArray = JSON.parse(dataArray);
    new PokemonPage(dataArray![idParam - 1])
  }
}

async function getPokeData() {
  const response = await fetch('http://localhost:4000/pokedata');
  const data = await response.json();
  return await data;
}
