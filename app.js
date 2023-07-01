import Destructable from "./models/Destructable.js";
import Game from "./models/Game.js";
import Player from "./models/Player.js";
import Settings from "./models/Settings.js";

console.log('here');
let domElement = document.getElementById('main');
let pauseButton  = document.getElementById('pauseButton');
// let audioElement = document.getLElementById('whack');
// audioElement.play();
let settings = new Settings();
let player =  new Player(40, 40, 0, 0, '/sprites/123.png', '/sprites/hammer2.png', '/sprites/hammer3.png');
let game = new Game(domElement, pauseButton, player, createDestructable, settings);

function createDestructable(width, height, minSize, maxSize) {
    let size = Math.random() * (maxSize - minSize) + minSize;
    let randomX = Math.random() * (width - size);
    let randomY = Math.random() * (height - size);
    let imageNumber = Math.ceil(Math.random() * 2);
    let destructable = new Destructable(size, size, randomX, randomY, `/sprites/barrel1${imageNumber}.webp`, 5);
    return destructable;
}
game.start()


