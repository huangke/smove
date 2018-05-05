cc.Class({
    extends: cc.Component,

    properties: {
        size: 80
    },

    onLoad () {
        this.setInputConstrol();
    },

    start () {

    },

    // update (dt) {},

    setInputConstrol: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function(keyCode, event){
                switch(keyCode) {
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
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        },self.node);
    }
});
