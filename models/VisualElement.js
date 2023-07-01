export default class VisualElement {
    constructor(width, height, x, y, imgPath) {
        this._element = this._createElement(width, height, x, y, imgPath);
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.imgPath = imgPath;
    }

    get height(){
        return this._height;
    }

    set height(val) {
        this._height = val;
        this._element.style.height = val + 'px';
    }

    get width(){
        return this._width;
    }

    set width(val) {
        this._width = val;
        this._element.style.width = val + 'px';
    }

    _createElement(width, height, x, y, imgPath) {
        let element = document.createElement('div');
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        element.style.backgroundImage = `url('${imgPath}')`;
        element.classList.add('image-object');
        return element;
    }

    _hasCollision(other) {
        let rect1 = this._element.getBoundingClientRect();
        let rect2 = other._element.getBoundingClientRect();

        // if (RectA.X1 < RectB.X2 && RectA.X2 > RectB.X1 &&
        //     RectA.Y1 > RectB.Y2 && RectA.Y2 < RectB.Y1)

        if (rect1.left <= rect2.right && rect1.right >= rect2.left &&
            rect1.top <= rect2.bottom && rect1.bottom >= rect2.top) {
            return true;
        }

        return false;
    }
}

