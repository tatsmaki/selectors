import levels from "./levels";
import quests from "./quests";
import selectors from "./selectors";
import parseHTML from "./parseHTML";

class Elements {
    constructor () {
        this.main = null;
        this.userInterfaceFragment = document.createDocumentFragment();
        this.quest = document.createElement("p");
        this.screen = document.createElement("div");
        this.codeCSS = document.createElement("input");
        this.codeHTML = document.createElement("div");
        this.menu = document.createElement("button");
        this.menuScreen = document.createElement("div");
        this.selector = "";
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

    createDocument (currentLevel, selector) {
        this.currentLevel = currentLevel;
        this.selector = selector;

        this.quest.classList.add("quest");
        this.screen.classList.add("screen");
        this.codeCSS.classList.add("codeCSS");
        this.codeHTML.classList.add("codeHTML");
        this.menu.classList.add("menu");
        this.menuScreen.classList.add("menuScreen");

        this.quest.textContent = quests[this.currentLevel];
        this.screen.appendChild(this.main);
        this.codeCSS.placeholder = 'Type CSS selector here';
        this.codeHTML.innerText = parseHTML(this.screen.innerHTML);
        this.menu.innerHTML = "<i class='material-icons'>menu</i>";
        this.menu.addEventListener('click', () => {
            this.toggleMenu();
        });
        const levelsList = document.createElement('ol');
        Object.keys(levels).forEach( item => {
            const element = document.createElement('li');
            element.textContent = item;
            element.addEventListener('click', () => {
                this.currentLevel = item;
                this.loadNextLevel(item);
                this.saveToLocal();
                this.toggleMenu();
            });
            levelsList.appendChild(element);
        });
        this.menuScreen.appendChild(levelsList);

        this.userInterfaceFragment.appendChild(this.quest);
        this.userInterfaceFragment.appendChild(this.screen);
        this.userInterfaceFragment.appendChild(this.codeCSS);
        this.userInterfaceFragment.appendChild(this.codeHTML);
        this.userInterfaceFragment.appendChild(this.menu);
        this.userInterfaceFragment.appendChild(this.menuScreen);
        document.body.appendChild(this.userInterfaceFragment);
    }

    loadNextLevel (level) {
        this.loadLevel(levels[level]);
        this.screen.innerHTML = '';
        this.screen.appendChild(this.main);
        this.codeHTML.innerText = parseHTML(this.screen.innerHTML);
        this.selector = selectors[level];
        this.quest.textContent = quests[this.currentLevel];
    }

    saveToLocal () {
        localStorage.setItem('tatsmaki-JS2020Q3-currentLevel', this.currentLevel);
    }

    toggleMenu () {
        if (this.menuStatus) {
            this.menuScreen.style.top = '-100vh';
        } else {
            this.menuScreen.style.top = 0;
        }
        this.menuStatus = !this.menuStatus;
    }

    selectorCheck () {
        if (this.codeCSS.value.replace(/ /g, '') === this.selector) {
            this.codeCSS.value = '';
            const win = this.screen.querySelectorAll(this.selector);
            win.forEach( item => {
                item.animate([
                    { marginTop: '-100vh' }
                ],{
                    duration: 1000,
                    easing: 'ease'
                });
            });
            const findLevel = Object.keys(levels);
            const nextLevel = findLevel[findLevel.indexOf(this.currentLevel) + 1];
            setTimeout( () => {
                if (nextLevel) {
                    this.loadNextLevel(nextLevel);
                } else {
                    this.screen.innerHTML = '';
                    this.quest.textContent = 'Game End';
                    this.screen.style.color = 'white';
                    localStorage.clear();
                }
            }, 1000);
            this.currentLevel = nextLevel;
            this.saveToLocal();
        } else {
            const wrong = this.screen.querySelectorAll(this.codeCSS.value);
            wrong.forEach( item => {
                item.animate([
                    { marginTop: 0 },
                    { marginTop: '-20px' },
                    { marginTop: 0 },
                    { marginTop: '20px' },
                    { marginTop: 0 },
                    { marginTop: '-20px' },
                    { marginTop: 0 },
                    { marginTop: '20px' },
                    { marginTop: 0 }
                ],{
                    duration: 1000,
                    easing: 'ease'
                });
            });
        }
    }
}

export default Elements;