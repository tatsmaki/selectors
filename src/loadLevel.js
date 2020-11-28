class Elements {
    constructor () {
        this.main = null;
    }

    loadLevel (level) {
        const fragment = document.createDocumentFragment();
        level.forEach( item => {
            const element = document.createElement(item.element);
            if (!item.animation) {
                element.classList.add('stop');
            }
            if (item.id) {
                element.setAttribute('id', item.id);
            }
            fragment.appendChild(element);
        });
        this.main = fragment;
    }
}

export default Elements;