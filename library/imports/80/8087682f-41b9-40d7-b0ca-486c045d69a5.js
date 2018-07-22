"use strict";
cc._RF.push(module, '80876gvQblA17DKSGwEXWml', 'BlockConfig');
// Script/BlockConfig.js

"use strict";

var Direction = require("direction");
var BlockConfig = {

    burnPoint: [],

    initConfig: function initConfig(centerNode) {
        var right = [cc.p(centerNode.x - cc.winSize.width / 2 - 40, centerNode.y + 80), cc.p(centerNode.x - cc.winSize.width / 2 - 40, centerNode.y), cc.p(centerNode.x - cc.winSize.width / 2 - 40, centerNode.y - 80)];
        var left = [cc.p(centerNode.x + cc.winSize.width / 2 + 40, centerNode.y + 80), cc.p(centerNode.x + cc.winSize.width / 2 + 40, centerNode.y), cc.p(centerNode.x + cc.winSize.width / 2 + 40, centerNode.y - 80)];
        var down = [cc.p(centerNode.x - 80, centerNode.y + cc.winSize.height / 2 + 40), cc.p(centerNode.x, centerNode.y + cc.winSize.height / 2 + 40), cc.p(centerNode.x + 80, centerNode.y + cc.winSize.height / 2 + 40)];
        var up = [cc.p(centerNode.x - 80, centerNode.y - cc.winSize.height / 2 - 40), cc.p(centerNode.x, centerNode.y - cc.winSize.height / 2 - 40), cc.p(centerNode.x + 80, centerNode.y - cc.winSize.height / 2 - 40)];

        this.burnPoint[Direction.left] = left;
        this.burnPoint[Direction.right] = right;
        this.burnPoint[Direction.up] = up;
        this.burnPoint[Direction.down] = down;
    },

    getBlockConfig10: function getBlockConfig10() {
        var random = cc.rand();
        var dir = Math.round(random) % 4;
        var dirTab = [];
        dirTab = this.burnPoint[dir];

        var first = this.getRandom(3);
        return { first: { point: dirTab[first], dir: dir, speed: 5 }, second: null };
    },

    getBlockConfig20: function getBlockConfig20() {
        var random = cc.rand();
        var first_dir = Math.round(random) % 4;
        var first_dirTab = [];
        first_dirTab = this.burnPoint[first_dir];

        var first = this.getRandom(3);
        var second = this.getRandom(3);
        var second_dir = first_dir + 1;
        if (first_dir === Direction.right) {
            second_dir = Direction.left;
        }
        if (first_dir === Direction.down) {
            second_dir = Direction.up;
        }
        var second_dirTab = this.burnPoint[second_dir];
        return { first: { point: first_dirTab[first], dir: first_dir, speed: 5 },
            second: { point: second_dirTab[second], dir: second_dir, speed: 5 } };
    },

    getBlockConfig30: function getBlockConfig30() {
        var random = cc.rand();
        var dir = Math.round(random) % 4;
        var dirTab = [];
        dirTab = this.burnPoint[dir];

        var first = this.getRandom(3);
        var second = this.getRandom(3, first);
        return { first: { point: dirTab[first], dir: dir, speed: 5.5 },
            second: { point: dirTab[second], dir: dir, speed: 6.5 } };
    },

    getBlockConfig: function getBlockConfig(score) {
        if (score <= 10) {
            return this.getBlockConfig10();
        } else if (score <= 20) {
            return this.getBlockConfig20();
        } else if (score <= 30) {
            return this.getBlockConfig30();
        }
        var random = cc.rand();
        var dir = Math.round(random) % 4;
        var dirTab = [];
        dirTab = this.burnPoint[dir];

        var first = this.getRandom(3);
        var second = this.getRandom(3, first);
        return { first: { point: dirTab[first], dir: dir, speed: 6 },
            second: { point: dirTab[second], dir: dir, speed: 6 } };
    },

    getRandom: function getRandom(randomRange, lastRandom) {
        var random = cc.rand();
        var ret = Math.round(random) % randomRange;
        if (lastRandom != undefined && lastRandom == ret) {
            return this.getRandom(randomRange, lastRandom);
        }
        return ret;
    }
};

module.exports = BlockConfig;

cc._RF.pop();