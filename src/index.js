import "./index.css";
import levels from "./levels";
import quests from "./quests";
import selectors from "./selectors";
import Elements from "./loadLevel";

let currentLevel;
if (localStorage.getItem('tatsmaki-JS2020Q3-currentLevel')) {
    currentLevel = localStorage.getItem('tatsmaki-JS2020Q3-currentLevel');
} else {
    currentLevel = 'A';
}
const level = levels[currentLevel];
let selector = selectors[currentLevel];
const Game = new Elements;
Game.loadLevel(level);

const saveToLocal = () => {
    localStorage.setItem('tatsmaki-JS2020Q3-currentLevel', currentLevel);
}

const parseHTML = string => {
    return string.replace(/><\/\w+>/g, ' />\n').replace(/ class="stop"/g, '');
}

const userInterfaceFragment = document.createDocumentFragment();

const quest = document.createElement("p");
quest.classList.add("quest");
quest.textContent = quests[currentLevel];
userInterfaceFragment.appendChild(quest);

const screen = document.createElement("div");
screen.classList.add("screen");
screen.appendChild(Game.main);
userInterfaceFragment.appendChild(screen);

const codeCSS = document.createElement("input");
codeCSS.classList.add("codeCSS");
codeCSS.placeholder = 'Type CSS selector here';
userInterfaceFragment.appendChild(codeCSS);

const codeHTML = document.createElement("div");
codeHTML.classList.add("codeHTML");
codeHTML.innerText = parseHTML(screen.innerHTML);
userInterfaceFragment.appendChild(codeHTML);

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
const menu = document.createElement("button");
menu.addEventListener('click', toggleMenu);
menu.classList.add("menu");
menu.innerHTML = "<i class='material-icons'>menu</i>";
userInterfaceFragment.appendChild(menu);

const menuScreen = document.createElement("div");
menuScreen.classList.add("menuScreen");
const levelsList = document.createElement('ol');
Object.keys(levels).forEach( item => {
    const element = document.createElement('li');
    element.textContent = item;
    element.addEventListener('click', () => {
        currentLevel = item;
        Game.loadLevel(levels[item]);
        screen.innerHTML = '';
        screen.appendChild(Game.main);
        codeHTML.innerText = parseHTML(screen.innerHTML);
        selector = selectors[item];
        quest.textContent = quests[currentLevel];
        saveToLocal();
        toggleMenu();
    });
    levelsList.appendChild(element);
});
menuScreen.appendChild(levelsList);
userInterfaceFragment.appendChild(menuScreen);

document.body.appendChild(userInterfaceFragment);

const selectorCheck = () => {
    if (codeCSS.value.replace(/ /g, '') === selector) {
        codeCSS.value = '';
        const win = screen.querySelectorAll(selector);
        win.forEach( item => {
            item.animate([
                { marginTop: '-100vh' }
            ],{
                duration: 1000,
                easing: 'ease'
            });
        });
        const findLevel = Object.keys(levels);
        const nextLevel = findLevel[findLevel.indexOf(currentLevel) + 1];
        setTimeout( () => {
            if (nextLevel) {
                Game.loadLevel(levels[nextLevel]);
                screen.innerHTML = '';
                screen.appendChild(Game.main);
                codeHTML.innerText = parseHTML(screen.innerHTML);
                selector = selectors[nextLevel];
                quest.textContent = quests[currentLevel];
            } else {
                screen.innerHTML = '';
                quest.textContent = 'Game End';
                screen.style.color = 'white';
                localStorage.clear();
            }
        }, 1000);
        currentLevel = nextLevel;
        saveToLocal();
    } else {
        const wrong = screen.querySelectorAll(codeCSS.value);
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

const keyPress = key => {
    if (key.which === 13) {
        selectorCheck();
    }
}

window.addEventListener('keydown', keyPress);