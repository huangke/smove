var Direction = require("direction");
var BlockPool = require("BlockPool");
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
        dir: Direction.left,
        _isInit: false,
        _game: null,
        _isCached: false
    },

    create: function(pos,speed,dir,game) {
        this.node.active = true;
        this.node.setPosition(pos);
        this.speed = speed;
        this.dir = dir;
        this._isInit = true;
        this._game = game;
    },

    update: function(dt) {
        if(!this._isInit) {
            return;
        }
        this.changePos();
        this.checkCollide();
    },

    changePos: function() {
        switch(this.dir) {
            case Direction.left:
                this.node.x -= this.speed;
                if(this.node.x < this._game.centerNode.x - cc.winSize.width/2 - 40) {
                    this.releaseSelf();
                }
                break;
            case Direction.right:
                this.node.x += this.speed;
                if(this.node.x > this._game.centerNode.x + cc.winSize.width/2 + 40) {
                    this.releaseSelf();
                }
                break;
            case Direction.up:
                this.node.y += this.speed;
                if(this.node.y > this._game.centerNode.y + cc.winSize.height/2 + 40) {
                    this.releaseSelf();
                }
                break;
            case Direction.down:
                this.node.y -= this.speed;
                if(this.node.y < this._game.centerNode.y - cc.winSize.height/2 - 40) {
                    this.releaseSelf();
                }
                break;
        }
    },

    releaseSelf: function() {
        this.node.active = false;
        BlockPool.releaseBlock(this);
    },

    hide: function() {
        this.node.active = false;
    },

    checkCollide: function() {
        var playPos = this._game._player.getPosition();
        var distance = cc.pDistance(playPos, this.node.getPosition());
        if(distance < (this._game.playerRadius + this._game.blockRadius) / 2) {
            this._game.gameOver();
        }
    }
});
