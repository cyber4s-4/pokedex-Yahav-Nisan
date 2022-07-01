import { Pokemon } from "./pokemon";

export class ListManager {
    data: any;
    // index: number;
    // cards: Card[];
    parentEl: HTMLElement;
    el: HTMLElement;
    dataArray: any = [];
    pokemonsArray: Pokemon[];
    offset: number;

    constructor(parentEl: HTMLElement, dataArray: any[]) {
        this.el = this.createElement();
        this.parentEl = parentEl;
        this.dataArray = dataArray;
        this.pokemonsArray = [];
        this.offset = 0;
        console.log(this.dataArray)
    }

    displayGrid() {
        // this.cards.forEach(card => {
        //     card.render();
        // })

    }

    loadMore() {
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
        // for (i = this.offset; i < this.dataArray.length && i < 20; i++) {
        //     console.log(this.dataArray[i]);

        // }
        // this.offset + i
    }


    next() {
        return this.data.next;
    }
    createElement() {
        const el = document.createElement('div');
        el.setAttribute('id', 'list');
        const ul = document.createElement('ul');
        const btn = document.createElement('button');
        btn.textContent = "Load more Pokémon"
        // ul.innerHTML = 'No Results';
        btn.addEventListener('click', () => this.loadMore());
        el.append(ul, btn)

        return el;
    }
    render() {
        this.loadMore()
        this.parentEl.append(this.el);
    }
}