
cc.Class({
    extends: cc.Component,

    properties: {
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
        this.timer = this.getComponent("timer");
        this._timeLabel = cc.find("time", this.node).getComponent(cc.Label);
    },

    start () {
        // this.startTimer();
    },

    startTimer(){
        // this.schedule(this.updateTimer, 1, );
    },

    updateTimer(){
        this._timeLabel.string = cc.js.formatStr("%d:%d",  this.timer.leftTime/60,  this.timer.leftTime%60)
    },

    update (dt) {
        this. updateTimer();
    },
});
