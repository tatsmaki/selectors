import levels from "./levels";
import quests from "./quests";
import selectors from "./selectors";

class Elements {
    constructor () {
        this.main = null;
        this.userInterfaceFragment = null;
        this.quest = null;
        this.screen = null;
        this.codeCSS = null;
        this.codeHTML = null;
        this.menu = null;
        this.menuScreen = null;
        this.selector = "water";
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
        this.userInterfaceFragment = document.createDocumentFragment();

        this.quest = document.createElement("p");
        this.quest.classList.add("quest");
        this.quest.textContent = quests[this.currentLevel];
        this.userInterfaceFragment.appendChild(this.quest);

        this.screen = document.createElement("div");
        this.screen.classList.add("screen");
        this.screen.appendChild(this.main);
        this.userInterfaceFragment.appendChild(this.screen);

        this.codeCSS = document.createElement("input");
        this.codeCSS.classList.add("codeCSS");
        this.codeCSS.placeholder = 'Type CSS selector here';
        this.userInterfaceFragment.appendChild(this.codeCSS);

        this.codeHTML = document.createElement("div");
        this.codeHTML.classList.add("codeHTML");

        this.codeHTML.innerText = this.parseHTML(this.screen.innerHTML);
        this.userInterfaceFragment.appendChild(this.codeHTML);

        let menuStatus = false;
        const toggleMenu = () => {
            const menuScreen = document.querySelector('.menuScreen');
            if (menuStatus) {
                menuScreen.style.top = '-100vh';
            } else {
                menuScreen.style.top = 0;
            }
            menuStatus = !menuStatus;
        }
        this.menu = document.createElement("button");
        this.menu.addEventListener('click', toggleMenu);
        this.menu.classList.add("menu");
        this.menu.innerHTML = "<i class='material-icons'>menu</i>";
        this.userInterfaceFragment.appendChild(this.menu);

        this.menuScreen = document.createElement("div");
        this.menuScreen.classList.add("menuScreen");
        const levelsList = document.createElement('ol');
        Object.keys(levels).forEach( item => {
            const element = document.createElement('li');
            element.textContent = item;
            element.addEventListener('click', () => {
                this.currentLevel = item;
                this.loadLevel(levels[item]);
                this.screen.innerHTML = '';
                this.screen.appendChild(this.main);
                this.codeHTML.innerText = this.parseHTML(this.screen.innerHTML);
                this.selector = selectors[item];
                this.quest.textContent = quests[this.currentLevel];
                this.saveToLocal();
                toggleMenu();
            });
            levelsList.appendChild(element);
        });
        this.menuScreen.appendChild(levelsList);
        this.userInterfaceFragment.appendChild(this.menuScreen);

        document.body.appendChild(this.userInterfaceFragment);
    }

    saveToLocal () {
        localStorage.setItem('tatsmaki-JS2020Q3-currentLevel', this.currentLevel);
    }
    
    parseHTML (string) {
        return string.replace(/><\/\w+>/g, ' />\n').replace(/ class="stop"/g, '');
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
                    this.loadLevel(levels[nextLevel]);
                    this.screen.innerHTML = '';
                    this.screen.appendChild(this.main);
                    this.codeHTML.innerText = this.parseHTML(this.screen.innerHTML);
                    this.selector = selectors[nextLevel];
                    this.quest.textContent = quests[this.currentLevel];
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