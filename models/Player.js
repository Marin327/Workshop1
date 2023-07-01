import VisualElement from "./VisualElement.js";

export default class Player extends VisualElement {
    constructor(width, height, x, y, imgPath, imgClickedPath, imgClickedPath2) {
        super(width, height, x, y, imgPath);
        this.imgClickedPath = imgClickedPath;
        this.imgClickedPath2 = imgClickedPath2;
        this._element.classList.add('player');
    }

    get x() {
        return this._x;
    }

    set x(val) {
        this._x = val;
        this._element.style.left = val + 'px';
    }

    get y() {
        return this._y;
    }

    set y(val) {
        this._y = val;
        this._element.style.top = val + 'px';
    }

    move(e) {
        let xOffset = e.movementX;
        let yOffset = e.movementY;
        this.x += xOffset;
        this.y += yOffset;
        // console.log(this.x + " " + this.y);
    }

    handleClick() {
        this._element.style.backgroundImage = `url('${this.imgClickedPath}')`;
        setTimeout(() => this._element.style.backgroundImage = `url('${this.imgClickedPath2}')`, 100);
        setTimeout(() => this._element.style.backgroundImage = `url('${this.imgPath}')`, 200);
    }
}