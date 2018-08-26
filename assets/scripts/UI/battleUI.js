
cc.Class({
    extends: cc.Component,

    properties: {
        curScene: {
            default: null,       
            type: require("Scene"),
        },
        curPlayer: {
            get(){
                return this._curPlayer;
            },
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.curScene = cc.find("scene").getComponent("Scene");
        this._curPlayer = cc.find("Player").getComponent("Cat");
        this.timer = this.curScene.getComponent("timer");
        this._timeLabel = cc.find("time", this.node).getComponent(cc.Label);
        this._powerLabel = cc.find("power", this.node).getComponent(cc.Label);
    },

    start () {
    },

    update (dt) {
        if (this.curScene.status != 0) {
            return;
        }
        switch (this.curScene.status) {
            case 0:
                this.updateTimer();
                this.updateHero();
                break;
            case 1:
                this.success();
                break;
            case 2:
                this.fail();
                break;
            case 3:
                this.puase();
                break;                
            default:
                break;
        }
    },

    updateTimer(){
        this._timeLabel.string = this.timer.timeStr();
    },

    updateHero(){
        var curPower = this._curPlayer.getComponent("Power").curPower;
        this._powerLabel.string = "剩余体力：" + curPower;
    },

    puase(){},
    success(){},
    fail(){},

});
