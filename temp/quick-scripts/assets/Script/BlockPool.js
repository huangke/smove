(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/BlockPool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4f0dbdJIYlJz5LM+2thK4Hu', 'BlockPool', __filename);
// Script/BlockPool.js

'use strict';

var BlockPool = {

    blockCache: [],

    createBlock: function createBlock(blockPrefab, game) {
        var newBlock = null;
        if (this.blockCache.length > 0) {
            for (var i = 0; i < this.blockCache.length; i++) {
                if (this.blockCache[i]._isCached == true) {
                    this.blockCache[i]._isCached = false;
                    newBlock = this.blockCache[i];
                    break;
                }
            }
        }
        if (!newBlock) {
            var block = cc.instantiate(blockPrefab);
            newBlock = block.getComponent('block');
            game.node.addChild(block);
            newBlock._isCached = false;
            this.blockCache.push(newBlock);
        }
        return newBlock;
    },

    releaseBlock: function releaseBlock(block) {
        block._isCached = true;
    },

    cacheAllBlock: function cacheAllBlock() {
        for (var i = 0; i < this.blockCache.length; i++) {
            this.blockCache[i]._isCached = true;
            this.blockCache[i]._isInit = false;
            // this.blockCache[i].hide();
        }
    },

    hideAllBlock: function hideAllBlock() {
        for (var i = 0; i < this.blockCache.length; i++) {
            this.blockCache[i].hide();
        }
    }
};

module.exports = BlockPool;

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
        //# sourceMappingURL=BlockPool.js.map
        