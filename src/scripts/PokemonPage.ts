export class PokemonPage {
    data: any;

    constructor(data: any) {
        this.data = data;
        this.render();
    }

    render() {
        document.getElementById('name')!.innerText = this.data.name;
        document.getElementById('id')!.innerText = '#' + this.data.id;
        document.getElementsByTagName('img')[0]!.src = this.data.imageUrl;
        document.getElementById('height')!.innerText = this.data.height + '"';
        document.getElementById('weight')!.innerText = this.data.weight + 'lbs';
        document.getElementById('types')!.innerText = this.data.types.toString();
        document.getElementById('abilities')!.innerText = this.data.abilities.toString();
    }

}