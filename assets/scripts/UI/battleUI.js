
cc.Class({
    extends: cc.Component,

    properties: {
        curScene: {
            default: null,       
            type: require("Scene"),
        }
        // totoalTime: 0,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.curScene = cc.find("scene").getComponent("Scene");
        this.timer = this.curScene.getComponent("timer");
        this._timeLabel = cc.find("time", this.node).getComponent(cc.Label);
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

    puase(){},
    success(){},
    fail(){},

});
