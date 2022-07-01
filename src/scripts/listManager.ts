import { Card } from "./card";
import { Pokemon } from "./pokemon";

export class ListManager {
    data: any;
    // index: number;
    // cards: Card[];
    parentEl: HTMLElement;
    el: HTMLElement;
    pokemonsArray: Pokemon[];
    lastPage: any;

    constructor(parentEl: HTMLElement, pokemonsArray: Pokemon[]) {
        this.el = this.createElement();
        this.parentEl = parentEl;
        this.pokemonsArray = pokemonsArray;
        this.lastPage = 1;
    }
    initCards(): Card[] {
        const result: Card[] = [];
        const array = this.data.results;
        array.forEach((data: { url: any; }) => {
            result.push(new Card(this.el, data));

        });
        return result;

    }
    displayGrid() {
        // this.cards.forEach(card => {
        //     card.render();
        // })

    }

    loadMore() {

    }


    next() {
        return this.data.next;
    }
    createElement() {
        const el = document.createElement('div');
        el.setAttribute('id', 'list');
        const ul = document.createElement('ul');
        const btn = document.createElement('buttom');
        btn.textContent = "Load more Pokémon"
        ul.innerHTML = 'No Results';
        el.append(ul, btn)

        return el;
    }
    render() {
        this.displayGrid();
        this.parentEl.append(this.el);
    }
}