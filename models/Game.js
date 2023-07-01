export default class Game {
    constructor(domMainElement, domElement, pauseButton, player, createDestructable, settings, audioElement) {
        this.domMainElement = domMainElement;
        this.domElement = domElement;
        this.audioElement = audioElement;
        this.pauseButton = pauseButton;
        this.player = player;
        this.createDestructable = createDestructable;
        this.destructables = [];
        this.baseTime = 0;
        this.settings = settings;
        this.domElement.style.width = this.settings.width + 'px';
        this.domElement.style.height = this.settings.height + 'px';
    }

    start() {
        let destructable1 = this.createDestructable(this.settings.width, this.settings.height, this.settings.destructablesMinSize, this.settings.destructablesMaxSize);
        let destructable2 = this.createDestructable(this.settings.width, this.settings.height, this.settings.destructablesMinSize, this.settings.destructablesMaxSize);
        this.destructables.push(destructable1);
        this.destructables.push(destructable2);
        this.domElement.appendChild(destructable1._element);
        this.domElement.appendChild(destructable2._element);
        // this.domElement.appendChild(this.player._element);
        // this._checkCollision();
        this.moveListener = this.player.move.bind(this.player);
        this.domElement.addEventListener('mouseenter', (e) => {
    
            this.player.x = e.offsetX - this.player.width / 2;
            this.player.y = e.offsetY - this.player.height / 2;
        });
        
        //children are considered part of the element so if the player hammer is under the mouse we're still considered 'in' 
        // this.domElement. Fixed it by spliting the field player and item field and attaching the handler on item field

        this.domElement.addEventListener('mousemove', this.moveListener, true);
        this.domMainElement.addEventListener('click', this._checkCollision.bind(this));
        this.pauseButton.addEventListener('click', this.pause.bind(this));
        this.spawnTimer = setInterval(this._spawn.bind(this), this.settings.spawnInterval);
    }

    _spawn() {
        let destructable = this.createDestructable(this.settings.width, this.settings.height, this.settings.destructablesMinSize, this.settings.destructablesMaxSize);
        this.destructables.push(destructable);
        this.domElement.appendChild(destructable._element);
    }

    pause() {
        clearInterval(this.spawnTimer);
    }

    _checkCollision(e) {
        this.player.handleClick();
        this.audioElement.play();
        for (const destructable of this.destructables) {
            let hasCollision = this.player._hasCollision(destructable);
            if (hasCollision) {
                let isDestroyed = destructable.handleCollision();
                if (isDestroyed) {
                    destructable._element.remove();
                    this.destructables = this.destructables.filter(x => x != destructable);
                }
            }
        }
    }
}

module.experts = Game;