import { ListManager } from "./listManager";
import { Pokemon } from "./pokemon";

export interface PokeData {
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
        fetch('http://localhost:4000/pokedata')
            .then(async response => {
                const data = await response.json();
                localStorage.clear();
                localStorage.setItem('pokeDataArray', JSON.stringify(data));
                return data;
            })
    }

    loadData() {
        const array = localStorage.getItem('pokeDataArray');
        if (array === null) {
            return this.getPokeData();
        } else
            return JSON.parse(array);
    }

    createElement() { // manager element
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

