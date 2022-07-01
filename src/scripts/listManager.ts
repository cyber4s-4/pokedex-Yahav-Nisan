import { Pokemon } from "./pokemon";

export class ListManager {
    parentEl: HTMLElement;  // parent HTML element
    el: HTMLElement;    //  component HTML element
    dataArray: any = [];    //  data of all pokemons - only data
    pokemonsArray: Pokemon[];   // array of pokemons component
    offset: number; //  index of last pokemon displayed

    constructor(parentEl: HTMLElement, dataArray: any[]) {
        this.el = this.createElement();
        this.parentEl = parentEl;
        this.dataArray = dataArray;
        this.pokemonsArray = [];
        this.offset = -1;
    }


    loadMore() {    //  load more 20 pokemons to list
        let i = 0;
        while (i < 20) {
            this.offset++;
            if (this.offset > this.dataArray.length - 1)
                break;
            const newPokemon = new Pokemon(this.el.firstElementChild as HTMLElement, this.dataArray[this.offset]);
            this.pokemonsArray.push(newPokemon);
            newPokemon.render();
            i++;
        }
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

    render() { // render the component
        this.loadMore()
        this.parentEl.append(this.el);
    }
}