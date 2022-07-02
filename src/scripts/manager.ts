import { ListManager } from "./listManager";
import { Pokemon } from "./pokemon";

interface PokeData {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: string[];
    abilities: string[];
    imageUrl: string;
}

export class Manager {
    parentEl: HTMLElement
    el: HTMLElement;
    dataArray: PokeData[] = []// data from api or localstorage - only data
    listManager: ListManager;
    pokemonsArray: Pokemon[]; // pokemon component  array data & ui


    constructor(parentEl: HTMLElement) {
        this.parentEl = parentEl;
        this.el = this.createElement();
        this.dataArray = this.loadData()
        this.pokemonsArray = [];
        this.listManager = new ListManager(this.el, this.dataArray);
    }



    getPokeData(): void {
        const result: PokeData[] = [];
        fetch('https://pokeapi.co/api/v2/pokemon?limit=120&offset=0')
            .then(async response => {
                const data = await response.json();
                const pokArray = await data.results;
                pokArray.forEach((element: { name: string, url: string }) => {
                    const name = element.name;
                    fetch(element.url)
                        .then(async response => {
                            const data = await response.json();
                            const id: number = data.id;
                            const types: any = [];
                            data.types.forEach((element: any) => {
                                types.push(element.type.name)
                            })
                            const height = data.height;
                            const weight = data.weight;
                            const abilities: string[] = [];
                            data.abilities.forEach((element: any) => {
                                abilities.push(element.ability.name)
                            })
                            const imageUrl = data.sprites.front_default
                            const pokedata: PokeData = { id, name, height, weight, types, abilities, imageUrl };
                            result.push(pokedata);
                            result.sort((a, b) => a.id - b.id);
                            localStorage.clear();
                            localStorage.setItem('pokeDataArray', JSON.stringify(result));
                        })
                });
                return result;
            })
    }

    loadData() {
        const array = localStorage.getItem('pokeDataArray');
        if (array === null) {
            return this.getPokeData();
        } else
            return JSON.parse(array);
    }

    createElement() {
        const el = document.createElement('div');
        el.setAttribute('id', 'box');
        const searchBar = document.createElement('div');
        searchBar.id = 'search-bar'
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Enter Pokemon Name')
        input.addEventListener('input', () => {
            this.listManager.renderFilteredList();
        })
        const btn = document.createElement('button');
        btn.innerText = 'Search';
        btn.addEventListener('click', () => {
            this.listManager.renderFilteredList()
        });
        searchBar.append(input, btn)
        el.append(searchBar);
        return el;
    }

    render() { //  display the manager
        this.listManager.renderFullList();
        this.parentEl.append(this.el);
    }
}

