"use strict";
cc._RF.push(module, '4f0dbdJIYlJz5LM+2thK4Hu', 'BlockPool');
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