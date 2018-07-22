"use strict";
cc._RF.push(module, 'a2cdeyIgrVJ9ohylWnW67vy', 'player');
// Script/player.js

"use strict";

var Direction = require("direction");
cc.Class({
    extends: cc.Component,

    properties: {
        moveSize: 80,
        offSetX: 0,
        offSetY: 0,
        maxOffSet: 1,
        minOffSet: -1,
        _game: null,
        actionDuration: 0.03
    },

    onLoad: function onLoad() {
        this.setInputConstrol();
    },

    reset: function reset() {
        this.offSetX = 0;
        this.offSetY = 0;
        this.node.setPosition(cc.p(0, 0));
    },

    stopAllActions: function stopAllActions() {
        this.offSetX = 0;
        this.offSetY = 0;
        this.node.stopAllActions();
    },
    // update (dt) {},

    setInputConstrol: function setInputConstrol() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                var dir = Direction.left;
                switch (keyCode) {
                    case cc.KEY.left:
                        dir = Direction.left;
                        break;
                    case cc.KEY.right:
                        dir = Direction.right;
                        break;
                    case cc.KEY.up:
                        dir = Direction.up;
                        break;
                    case cc.KEY.down:
                        dir = Direction.down;
                        break;
                }
                self.changePos(dir);
            }
            // onKeyReleased: function(keyCode, event) {
            //     switch(keyCode) {
            //         case cc.KEY.a:
            //             self.accLeft = false;
            //             break;
            //         case cc.KEY.d:
            //             self.accRight = false;
            //             break;
            //     }
            // }
        }, self.node);
    },

    changePos: function changePos(dir) {
        if (!this._game._isStart) {
            return;
        }
        switch (dir) {
            case Direction.left:
                if (this.offSetX > this.minOffSet) {
                    // this.node.x -= this.moveSize;
                    this.moveAction(-this.moveSize, 0);
                    this.offSetX--;
                }
                break;
            case Direction.right:
                if (this.offSetX < this.maxOffSet) {
                    // this.node.x += this.moveSize;
                    this.moveAction(this.moveSize, 0);
                    this.offSetX++;
                }
                break;
            case Direction.up:
                if (this.offSetY < this.maxOffSet) {
                    // this.node.y += this.moveSize;
                    this.moveAction(0, this.moveSize);
                    this.offSetY++;
                }
                break;
            case Direction.down:
                if (this.offSetY > this.minOffSet) {
                    // this.node.y -= this.moveSize;
                    this.moveAction(0, -this.moveSize);
                    this.offSetY--;
                }
                break;
        }
    },

    moveAction: function moveAction(moveX, moveY) {
        var action = cc.moveBy(this.actionDuration, moveX, moveY);
        var finished = cc.callFunc(function () {
            this._game.checkBonus();
        }, this);
        action.easing(cc.easeOut(this.actionDuration));
        var act = cc.sequence(action, finished);
        this.node.runAction(act);
    }
});

cc._RF.pop();