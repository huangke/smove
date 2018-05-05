(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a2cdeyIgrVJ9ohylWnW67vy', 'player', __filename);
// Script/player.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        size: 80
    },

    onLoad: function onLoad() {
        this.setInputConstrol();
    },
    start: function start() {},


    // update (dt) {},

    setInputConstrol: function setInputConstrol() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.left:
                        self.node.x -= self.size;
                        break;
                    case cc.KEY.right:
                        self.node.x += self.size;
                        break;
                    case cc.KEY.up:
                        self.node.y += self.size;
                        break;
                    case cc.KEY.down:
                        self.node.y -= self.size;
                        break;
                }
            },
            onKeyReleased: function onKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);
    }
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
        //# sourceMappingURL=player.js.map
        