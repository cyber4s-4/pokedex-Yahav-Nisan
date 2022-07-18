export class PokemonPage {
    data: any;

    constructor(data: any) {
        this.data = data;
        this.render();
    }

    // render a specific pokemon page
    render() {
        document.getElementById('name')!.innerText = this.data.name;
        document.getElementById('id')!.innerText = '#' + this.data.id;
        document.getElementsByTagName('img')[0]!.src = this.data.imageUrl;
        document.getElementById('height')!.innerText = this.data.height + '"';
        document.getElementById('weight')!.innerText = this.data.weight + ' lbs';
        document.getElementById('types')!.innerText = this.data.types.toString();
        document.getElementById('abilities')!.innerText = this.data.abilities.toString();
        document.getElementsByTagName('button')[0].addEventListener('click', () => {
            if (window.location.search === '?id=1') {
                window.location.href = '/pokemon?id=120';
            } else
                window.location.href = '/pokemon?id=' + (this.data.id - 1);
        });
        document.getElementsByTagName('button')[1].addEventListener('click', () => {
            if (window.location.search === '?id=120') {
                window.location.href = '/pokemon?id=1';
            } else
                window.location.href = '/pokemon?id=' + (this.data.id + 1);
        });
    }

}
