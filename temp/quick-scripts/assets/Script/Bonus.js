(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Bonus.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2550eOw9TRJyLwE1XeisE0f', 'Bonus', __filename);
// Script/Bonus.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _game: null,
        _bonusIndex: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var player = this._game._player.getComponent("player");
        var playerX = player.offSetX;
        var playerY = player.offSetY;
        var posTab = [];
        for (var i = 0; i < this._game._cellsTable.length; i++) {
            if (this._game._cellsTable[i].x != playerX && this._game._cellsTable[i].y != playerY) {
                posTab.push(this._game._cellsTable[i]);
            }
        }
        var randomIndex = Math.round(cc.rand()) % posTab.length;
        this._bonusIndex = posTab[randomIndex];
        this.node.setPosition(cc.p(80 * this._bonusIndex.x, 80 * this._bonusIndex.y));

        var seq = cc.repeatForever(cc.sequence(cc.rotateTo(2, 180, 180), cc.rotateTo(2, 360, 360)));
        this.node.runAction(seq);
    },
    start: function start() {},
    onCollect: function onCollect() {
        var player = this._game._player.getComponent("player");
        if (this._bonusIndex.x == player.offSetX && this._bonusIndex.y == player.offSetY) {
            this._game.addScore();
            this._game.createBonus();
            this.node.destroy();
        }
    }

    // update (dt) {},

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Bonus.js.map
        