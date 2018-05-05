var direction = require("direction")
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 1,
        dir: direction.left,// 0 left, 1 right, 2 down
        isInit: false
    },

    init (speed,dir) {
        this.speed = speed;
        this.dir = dir;
        this.isInit = true;
    },

    update (dt) {
        if(!this.isInit) {
            return;
        }
        switch(this.dir) {
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
    },
});
