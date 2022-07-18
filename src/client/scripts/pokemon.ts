
export class Pokemon {
    data: any;
    parentEl: HTMLElement;
    el: HTMLElement;

    constructor(parentEl: HTMLElement, data: any) {
        this.parentEl = parentEl;
        this.data = data;
        this.el = this.createElement();

    }

    createElement() {
        const el = document.createElement('li');
        el.classList.add('card');
        const img = document.createElement('img');
        img.src = this.data.imageUrl;
        const span = document.createElement('span');
        span.textContent = this.data.name;
        el.append(img, span);
        el.addEventListener('click', () => {
            window.location.href = './pokemon?id=' + this.data.id;
        });

        return el;
    }
    render() {
        this.parentEl.append(this.el);
    }
}
