
cc.Class({
    extends: cc.Component,

    properties: {
        _game: null,
        _bonusIndex: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
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

        var seq = cc.repeatForever(
            cc.sequence(
                cc.rotateTo(2, 180, 180),
                cc.rotateTo(2, 360, 360)
            ));
        this.node.runAction(seq);
    },

    start () {
    },

    onCollect () {
        var player = this._game._player.getComponent("player");
        if (this._bonusIndex.x == player.offSetX
        && this._bonusIndex.y == player.offSetY) {
            this._game.addScore();
            this._game.createBonus();
            this.node.destroy();
        }
    }

    // update (dt) {},
});
