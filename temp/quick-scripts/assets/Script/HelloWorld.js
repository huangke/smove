(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HelloWorld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld', __filename);
// Script/HelloWorld.js

'use strict';

var direction = require("direction");
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
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var player = cc.instantiate(this.playPrefab);
        this.node.addChild(player);
        // newStar.setPosition(cc.p(0,0));

        this.schedule(function () {
            this.createBlock();
        }.bind(this), 1);
    },

    createBlock: function createBlock() {
        var random = cc.rand();
        var dir = Math.round(random) % 4;
        this.createOneBlock(cc.p(this.centerNode.x - 80, cc.winSize.height), 5, dir);
        this.createOneBlock(cc.p(this.centerNode.x - 80, cc.winSize.height), 5, dir);
    },

    // called every frame
    update: function update(dt) {},

    createOneBlock: function createOneBlock(startPos, speed, dir) {
        var newBlock = cc.instantiate(this.blockPrefab);
        this.node.addChild(newBlock);
        newBlock.setPosition(startPos);
        var blockInstance = newBlock.getComponent('block');
        newBlock.getComponent('block').init(speed, dir);
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
        //# sourceMappingURL=HelloWorld.js.map
        