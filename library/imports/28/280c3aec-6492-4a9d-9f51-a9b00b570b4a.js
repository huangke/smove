"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'Game');
// Script/Game.js

"use strict";

var Direction = require("direction");
var BlockPool = require("BlockPool");
var BlockConfig = require("BlockConfig");
cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            default: null,
            type: cc.Label
        },

        playPrefab: {
            default: null,
            type: cc.Prefab
        },
        blockPrefab: {
            default: null,
            type: cc.Prefab
        },
        bounsPrefab: {
            default: null,
            type: cc.Prefab
        },
        centerNode: {
            default: null,
            type: cc.Node
        },
        startBtn: {
            default: null,
            type: cc.Button
        },

        _player: null,
        _bouns: null,
        playerRadius: 80,
        blockRadius: 80,
        _isStart: false,
        _dt: 0,

        _touchPosX: 0,
        _touchPosY: 0,
        _isMoved: false,

        _cellsTable: []

    },

    // use this for initialization
    onLoad: function onLoad() {
        this.score = 0;

        this.initCellsTable();
        BlockConfig.initConfig(this.centerNode);
        this.createPlayer();

        this.setTouchConstrol();
        this.startBtn.node.on("click", this.onStartGame, this);
    },

    initCellsTable: function initCellsTable() {
        var xIndex = [-1, 0, 1];
        var yIndex = [1, 0, -1];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var index = { x: xIndex[i], y: yIndex[j] };
                this._cellsTable.push(index);
            }
        }
        this._cellsTable.forEach(function (element) {
            cc.log("index: %d,%d", element.x, element.y);
        });
    },

    createPlayer: function createPlayer() {
        if (!this._player) {
            this._player = cc.instantiate(this.playPrefab);
            this._player.getComponent("player")._game = this;
            this.node.addChild(this._player, 1);
        }
        this._player.getComponent("player").reset();
    },

    createBonus: function createBonus() {
        this._bouns = cc.instantiate(this.bounsPrefab);
        this._bouns.getComponent("Bonus")._game = this;
        this.node.addChild(this._bouns, 2);
    },

    checkBonus: function checkBonus() {
        if (this._bouns) {
            this._bouns.getComponent("Bonus").onCollect();
        }
    },

    addScore: function addScore() {
        this.score++;
        this.scoreLabel.string = this.score.toString();
    },

    onStartGame: function onStartGame() {
        BlockPool.hideAllBlock();
        this._isStart = true;
        this._dt = 0;
        this.startBtn.node.active = false;

        this._player.getComponent("player").reset();
        this.createBonus();
        this.createBlock();
    },

    gameOver: function gameOver() {
        BlockPool.cacheAllBlock();
        this._isStart = false;
        this.startBtn.node.active = true;
        this.score = 0;
        this.scoreLabel.string = "";
        this._bouns.getComponent("Bonus").node.destroy();
        this._player.getComponent("player").stopAllActions();
    },

    createBlock: function createBlock() {

        var config = BlockConfig.getBlockConfig(this.score);
        this.createOneBlock(config["first"].point, config["first"].speed, config["first"].dir);
        cc.log("first dir: " + config["first"].dir);
        if (config["second"]) {
            this.createOneBlock(config["second"].point, config["second"].speed, config["second"].dir);
            cc.log("second dir: " + config["second"].dir);
        }
    },

    getUpdateDelt: function getUpdateDelt() {
        if (this.score <= 10) {
            return 2;
        } else if (this.score <= 20) {
            return 1.7;
        } else if (this.score <= 30) {
            return 1.5;
        } else if (this.score <= 40) {
            return 1.2;
        }
        return 1;
    },
    // called every frame
    update: function update(dt) {
        if (this._isStart == true) {
            this._dt += dt;
            if (this._dt >= this.getUpdateDelt()) {
                this._dt = 0;
                this.createBlock();
            }
        }
    },

    createOneBlock: function createOneBlock(startPos, speed, dir) {
        var block = BlockPool.createBlock(this.blockPrefab, this);
        block.create(startPos, speed, dir, this);
    },

    setTouchConstrol: function setTouchConstrol() {
        this.node.on('touchstart', function (event) {
            this._touchPosX = event.getLocationX();
            this._touchPosY = event.getLocationY();
            this._isMoved = false;
        }, this);
        this.node.on('touchmove', function (event) {
            if (this._isMoved) {
                return;
            }
            var touchDistance = cc.pDistance(cc.p(this._touchPosX, this._touchPosY), event.getLocation());
            var disX = event.getLocationX() - this._touchPosX;
            var disY = event.getLocationY() - this._touchPosY;
            var dir = -1;
            if (touchDistance >= 10) {
                if (disX > 0 && disY > 0) {
                    if (disX > disY) {
                        dir = Direction.right;
                    } else {
                        dir = Direction.up;
                    }
                } else if (disX > 0 && disY < 0) {
                    if (Math.abs(disX) > Math.abs(disY)) {
                        dir = Direction.right;
                    } else {
                        dir = Direction.down;
                    }
                } else if (disX < 0 && disY < 0) {
                    if (Math.abs(disX) > Math.abs(disY)) {
                        dir = Direction.left;
                    } else {
                        dir = Direction.down;
                    }
                } else if (disX < 0 && disY > 0) {
                    if (Math.abs(disX) > Math.abs(disY)) {
                        dir = Direction.left;
                    } else {
                        dir = Direction.up;
                    }
                } else if (disX == 0 && disY > 0) {
                    dir = Direction.up;
                } else if (disX == 0 && disY < 0) {
                    dir = Direction.down;
                } else if (disX > 0 && disY == 0) {
                    dir = Direction.right;
                } else if (disX < 0 && disY == 0) {
                    dir = Direction.left;
                }
                this._player.getComponent('player').changePos(dir);
                this._isMoved = true;
            }
        }, this);
    }
});

cc._RF.pop();