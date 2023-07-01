import VisualElement from "./VisualElement.js";

export default class Destructable extends VisualElement {
    constructor(width, height, x, y, imgPath, durability) {
        super(width, height, x, y, imgPath);
        this.durability = durability;
        this.baseWidth = width;
        this.baseHeight = height;
    }

    handleCollision(){
        this.durability = this.durability - 1;
        if(this.durability == 0) {
            return true;
        }
        this.width = this.width * 1.1;
        this.height = this.height * 0.9;
        return false;
    }
}