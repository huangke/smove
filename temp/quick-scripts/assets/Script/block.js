(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/block.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b878eF9NgVPX5kDcUz8469e', 'block', __filename);
// Script/block.js

"use strict";

var direction = require("direction");
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
        dir: direction.left, // 0 left, 1 right, 2 down
        isInit: false
    },

    init: function init(speed, dir) {
        this.speed = speed;
        this.dir = dir;
        this.isInit = true;
    },
    update: function update(dt) {
        if (!this.isInit) {
            return;
        }
        switch (this.dir) {
            case direction.left:
                this.node.x -= this.speed;
                break;
            case direction.right:
                this.node.x += this.speed;
                break;
            case direction.up:
                this.node.y += this.speed;
                break;
            case direction.down:
                this.node.y -= this.speed;
                break;
        }
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
        //# sourceMappingURL=block.js.map
        