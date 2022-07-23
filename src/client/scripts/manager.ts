import { ListManager } from './listManager';
import { Pokemon } from './pokemon';

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
    parentEl: HTMLElement;
    el: HTMLElement;
    listManager: ListManager;
    pokemonsArray: Pokemon[]; // pokemon component  array data & ui

    constructor(parentEl: HTMLElement) {
        this.parentEl = parentEl;
        this.el = this.createElement();
        this.pokemonsArray = [];
        this.listManager = new ListManager(this.el);
    }

    createElement() { // manager element
        const el = document.createElement('div');
        el.setAttribute('id', 'box');
        const searchBar = document.createElement('div');
        searchBar.id = 'search-bar';
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Enter Pokemon Name');
        const btn = document.createElement('button');
        btn.innerText = 'Search';
        btn.addEventListener('click', () => {
            this.listManager.renderFilteredList();
        });
        searchBar.append(input, btn);
        el.append(searchBar);
        return el;
    }

    render() { //  display the manager
        this.listManager.renderFullList();
        this.parentEl.append(this.el);
    }
}
