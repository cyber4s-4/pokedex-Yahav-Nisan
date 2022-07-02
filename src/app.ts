import { Manager } from "./scripts/manager";
import { PokemonPage } from "./scripts/PokemonPage";

const path = window.location.pathname;

window.addEventListener('load', () => {
  console.log("Let's start")
  const contentDiv = document.getElementById('content') as HTMLElement;

  if (path === '/')
    initMainPage(contentDiv);
  else if (path === '/pokemon.html')
    initPokemonPage();
});

function initMainPage(parenElement: HTMLElement) {
  const manager = new Manager(parenElement);
  manager.render();
}

function initPokemonPage() {
  console.log("test")
  const idParam: number = Number(window.location.search.slice(4));
  let dataArray = localStorage.getItem('pokeDataArray');
  if (dataArray !== null) {
    dataArray = JSON.parse(dataArray);
    console.log(new PokemonPage(dataArray![idParam]))
  }
}

