var Direction = require("direction");
var BlockPool = require("BlockPool");
cc.Class({
    extends: cc.Component,

    properties: {
        // label: {
        //     default: null,
        //     type: cc.Label
        // },
        // defaults, set visually when attaching this script to the Canvas
        playPrefab: {
            default: null,
            type: cc.Prefab
        },
        blockPrefab: {
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
        playerRadius: 80,
        blockRadius: 80,
        _blockPool: null,
        _isStart: false,
        _dt: 0,

        _touchPosX: 0,
        _touchPosY: 0,
        _isMoved: false
    },

    // use this for initialization
    onLoad: function () {
        this._player = cc.instantiate(this.playPrefab);
        this._player.getComponent("player")._game = this;
        this.node.addChild(this._player);
        this.setTouchConstrol();
        this.startBtn.node.on("click", this.onStartGame, this);
    },

    onStartGame: function() {
        BlockPool.hideAllBlock();
        this._isStart = true;
        this._dt = 0;
        this.createBlock();
        this.startBtn.node.active = false;
        if(this._player) {
            this._player.setPosition(cc.p(0, 0));
        }
    },

    gameOver: function () {
        BlockPool.cacheAllBlock();
        this._isStart = false;
        this.startBtn.node.active = true;

        this._player.getComponent("player").stopAllActions();
    },

    getRandom: function(randomRange, lastRandom) {
        var random = cc.rand();
        var ret = Math.round(random) % randomRange;
        if(lastRandom && lastRandom == ret) {
            return this.getRandom(randomRange, lastRandom);
        }
        return ret;
    },

    createBlock: function() {
        var random = cc.rand();
        var dir = Math.round(random) % 4;
        var down = [cc.p(this.centerNode.x - 80,this.centerNode.y + cc.winSize.height/2 + 40),cc.p(this.centerNode.x,this.centerNode.y + cc.winSize.height/2 + 40),cc.p(this.centerNode.x + 80,this.centerNode.y + cc.winSize.height/2 + 40)];
        var up = [cc.p(this.centerNode.x - 80,this.centerNode.y - cc.winSize.height/2 - 40),cc.p(this.centerNode.x,this.centerNode.y - cc.winSize.height/2 - 40),cc.p(this.centerNode.x + 80,this.centerNode.y - cc.winSize.height/2 - 40)];
        var right = [cc.p(this.centerNode.x - cc.winSize.width/2 - 40,this.centerNode.y),cc.p(this.centerNode.x - cc.winSize.width/2 - 40,this.centerNode.y + 80),cc.p(this.centerNode.x - cc.winSize.width/2 - 40,this.centerNode.y - 80)];
        var left = [cc.p(this.centerNode.x + cc.winSize.width/2 + 40,this.centerNode.y),cc.p(this.centerNode.x + cc.winSize.width/2 + 40,this.centerNode.y + 80),cc.p(this.centerNode.x + cc.winSize.width/2 + 40,this.centerNode.y - 80)];
        var dirTab = [];
        switch(dir){
            case Direction.left:
                dirTab = left;
            break;
            case Direction.right:
                dirTab = right;
            break;
            case Direction.up:
                dirTab = up;
            break;
            case Direction.down:
                dirTab = down;
            break;
        }
        var first = this.getRandom(3);
        var second = this.getRandom(3, first);
        this.createOneBlock(dirTab[first], 5 ,dir);
        this.createOneBlock(dirTab[second], 5 ,dir);
        cc.log("first: " + first + " second: " + second);
    },

    // called every frame
    update: function (dt) {
        if(this._isStart == true) {
            this._dt += dt;
            if(this._dt >= 2) {
                this._dt = 0;
                this.createBlock();
            }
        }
    },

    createOneBlock: function(startPos, speed, dir) {
        var block = BlockPool.createBlock(this.blockPrefab, this);
        block.create(startPos,speed, dir, this);
    },

    setTouchConstrol: function() {
        this.node.on('touchstart', function (event) {
            this._touchPosX = event.getLocationX();
            this._touchPosY = event.getLocationY();
            this._isMoved = false;
        }, this);
        this.node.on('touchmove', function (event) {
            if(this._isMoved) {
                return;
            }
            var touchDistance = cc.pDistance(cc.p(this._touchPosX,this._touchPosY), event.getLocation());
            var disX = event.getLocationX() - this._touchPosX;
            var disY = event.getLocationY() - this._touchPosY;
            var dir = -1;
            if(touchDistance >= 10) {
                if(disX > 0 && disY > 0) {
                    if(disX > disY) {
                        dir = Direction.right;
                    } else {
                        dir = Direction.up;
                    }
                } else if (disX > 0 && disY < 0) {
                    if(Math.abs(disX) > Math.abs(disY)) {
                        dir = Direction.right;
                    } else {
                        dir = Direction.down;
                    }
                } else if(disX < 0 && disY < 0) {
                    if(Math.abs(disX) > Math.abs(disY)) {
                        dir = Direction.left;
                    } else {
                        dir = Direction.down;
                    }
                } else if(disX < 0 && disY > 0) {
                    if(Math.abs(disX) > Math.abs(disY)) {
                        dir = Direction.left;
                    } else {
                        dir = Direction.up;
                    }
                } else if(disX == 0 && disY > 0) {
                    dir = Direction.up;
                } else if(disX == 0 && disY < 0) {
                    dir = Direction.down;
                } else if(disX > 0 && disY == 0) {
                    dir = Direction.right;
                } else if(disX < 0 && disY == 0) {
                    dir = Direction.left;
                }
                this._player.getComponent('player').changePos(dir);
                this._isMoved = true;
            }
        }, this);
    },

});
