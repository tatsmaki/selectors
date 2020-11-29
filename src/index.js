import "./index.css";
import levels from "./levels";
import selectors from "./selectors";
import Elements from "./gameEngine";

const firstLevel = 'A';
let currentLevel = firstLevel;
if (localStorage.getItem('tatsmaki-JS2020Q3-currentLevel')) {
    currentLevel = localStorage.getItem('tatsmaki-JS2020Q3-currentLevel');
}

const level = levels[currentLevel];
const selector = selectors[currentLevel];
const Game = new Elements;
Game.loadLevel(level);
Game.createDocument(currentLevel, selector);

const keyPress = key => {
    if (key.which === 13) {
        Game.selectorCheck();
    }
}

window.addEventListener('keydown', keyPress);