import { Pokemon } from "./pokemon";

export class ListManager {
    parentEl: HTMLElement;  // parent HTML element
    el: HTMLElement;    //  component HTML element
    pokemonsArray: Pokemon[];   // array of pokemon components
    offset: number; //  index of last pokemon displayed

    constructor(parentEl: HTMLElement) {
        this.el = this.createElement();
        this.parentEl = parentEl;
        this.pokemonsArray = [];
        this.offset = 0;
    }


    async loadMore() {    //  load 20 more pokemons to list
        const response = await fetch('http://localhost:4000/pokedata?offset=' + this.offset);
        const data = await response.json();
        let i = 0;
        while (i < 20 && data !== undefined) {
            const newPokemon = new Pokemon(this.el.firstElementChild as HTMLElement, await data[i]);
            this.pokemonsArray.push(newPokemon);
            newPokemon.render();
            i++;
        }
        this.offset += 20;
    }

    createElement() {   // create componenet element
        const el = document.createElement('div');
        el.setAttribute('id', 'list');
        const ul = document.createElement('ul');
        const btn = document.createElement('button');
        btn.textContent = "Load more Pokémon"
        btn.addEventListener('click', () => this.loadMore());
        el.append(ul, btn)

        return el;
    }

    renderFullList() { // render the component
        this.offset = 0;
        this.loadMore()
        this.parentEl.append(this.el);
    }

    // searching for a pokemon via the search bar
    async renderFilteredList() {
        const ul = document.getElementsByTagName('ul')[0];
        ul.innerHTML = '';
        let inputValue = document.getElementsByTagName('input')[0].value;
        if (inputValue === '') {
            this.renderFullList();
        } else {
            this.offset = 0;
            const response = await fetch('http://localhost:4000/pokedata?offset=' + this.offset + '&name=' + inputValue);
            const data = await response.json();
            let i = 0;
            while (i < 20 && await data[i] !== undefined) {
                const newPokemon = new Pokemon(this.el.firstElementChild as HTMLElement, await data[i]);
                this.pokemonsArray.push(newPokemon);
                newPokemon.render();
                i++;
            }
            if (await data.length === 0) {
                ul.textContent = 'Did Not Found Any Pokemon!'
            }
        }
    }
}