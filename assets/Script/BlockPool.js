var BlockPool = {

    blockCache: [],

    createBlock: function(blockPrefab, game) {
        var newBlock = null;
        if(this.blockCache.length > 0) {
            for(var i = 0; i < this.blockCache.length; i++) {
                if(this.blockCache[i]._isCached == true) {
                    this.blockCache[i]._isCached = false;
                    newBlock = this.blockCache[i];
                    break;
                }
            }
        } 
        if(!newBlock) {
            var block = cc.instantiate(blockPrefab);
            newBlock = block.getComponent('block');
            game.node.addChild(block);
            newBlock._isCached = false;
            this.blockCache.push(newBlock);
        }
        return newBlock;
    },

    releaseBlock: function (block) {
        block._isCached = true;
    },

    cacheAllBlock: function() {
        for(var i = 0 ; i < this.blockCache.length; i++) {
            this.blockCache[i]._isCached = true;
            this.blockCache[i]._isInit = false;
            // this.blockCache[i].hide();
        }
    },

    hideAllBlock: function() {
        for(var i = 0 ; i < this.blockCache.length; i++) {
            this.blockCache[i].hide();
        }
    }
};

module.exports = BlockPool;
