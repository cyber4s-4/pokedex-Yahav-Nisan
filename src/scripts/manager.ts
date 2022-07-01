import { ListManager } from "./listManager";
import { Page } from "./page";
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
    pages: Page[];
    currentPage: number;
    listManager: ListManager;
    pokemonsArray: Pokemon[]; // pokemon component  array data & ui


    constructor(parentEl: HTMLElement) {
        this.parentEl = parentEl;
        this.el = this.createElement();
        this.dataArray = this.loadData()
        this.pokemonsArray = [];
        this.listManager = new ListManager(this.el, this.pokemonsArray);
        this.pages = [];
        this.currentPage = -1;
        console.log(this.dataArray)

        this.init();
    }

    async init() {
        await this.loadPageFromApi('');
        // console.log(this.pages)
        this.displayPage(0);
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
                            console.log(imageUrl)
                            const pokedata: PokeData = { id, name, height, weight, types, abilities, imageUrl };
                            result.push(pokedata);
                            localStorage.clear();
                            localStorage.setItem('pokeDataArray', JSON.stringify(result));
                        })
                });
                return result;
            })
    }

    loadData() {
        //TODO: function that load data from localstorage if exist or from api
        const array = localStorage.getItem('pokeDataArray');
        if (array === null) {
            return this.getPokeData();
        } else
            return JSON.parse(array);
    }

    loadPageFromApi(url: string) {
        const defaultUrl = 'https://pokeapi.co/api/v2/pokemon';
        if (!url)
            url = defaultUrl;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    response.json()
                        .then(data => {
                            // console.log(data);
                            this.pages.push(new Page(this.el, data, this.pages.length));
                            // console.log(this.pages);
                            resolve('loaded')
                        })
                })
                .catch(error => reject(error));
        })
    }

    async displayPage(index: number) {
        if (index < 0)
            return;
        if (index < this.pages.length) {
            // console.log('page : ', index);
            this.pages[index].render();
        } else {
            this.loadPageFromApi(this.pages[this.pages.length - 1].next());
            this.displayPage(index);
        }
    }




    createElement() {
        const el = document.createElement('div');
        el.setAttribute('id', 'box');

        return el;
    }
    render() {
        this.listManager.render();
        this.parentEl.append(this.el);
    }
}

