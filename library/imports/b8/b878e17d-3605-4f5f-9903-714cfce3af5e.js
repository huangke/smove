"use strict";
cc._RF.push(module, 'b878eF9NgVPX5kDcUz8469e', 'block');
// Script/block.js

"use strict";

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

    create: function create(pos, speed, dir, game) {
        this.node.active = true;
        this.node.setPosition(pos);
        this.speed = speed;
        this.dir = dir;
        this._isInit = true;
        this._game = game;
    },

    update: function update(dt) {
        if (!this._isInit) {
            return;
        }
        this.changePos();
        this.checkCollide();
    },

    changePos: function changePos() {
        switch (this.dir) {
            case Direction.left:
                this.node.x -= this.speed;
                if (this.node.x < this._game.centerNode.x - cc.winSize.width / 2 - 40) {
                    this.releaseSelf();
                }
                break;
            case Direction.right:
                this.node.x += this.speed;
                if (this.node.x > this._game.centerNode.x + cc.winSize.width / 2 + 40) {
                    this.releaseSelf();
                }
                break;
            case Direction.up:
                this.node.y += this.speed;
                if (this.node.y > this._game.centerNode.y + cc.winSize.height / 2 + 40) {
                    this.releaseSelf();
                }
                break;
            case Direction.down:
                this.node.y -= this.speed;
                if (this.node.y < this._game.centerNode.y - cc.winSize.height / 2 - 40) {
                    this.releaseSelf();
                }
                break;
        }
    },

    releaseSelf: function releaseSelf() {
        this.node.active = false;
        BlockPool.releaseBlock(this);
    },

    hide: function hide() {
        this.node.active = false;
    },

    checkCollide: function checkCollide() {
        var playPos = this._game._player.getPosition();
        var distance = cc.pDistance(playPos, this.node.getPosition());
        if (distance < (this._game.playerRadius + this._game.blockRadius) / 2) {
            // this._game.gameOver();
        }
    }
});

cc._RF.pop();