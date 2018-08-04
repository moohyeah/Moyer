
cc.Class({
    extends: cc.Component,

    properties: {
        totoalTime: 0,
        leftTime:{
            get () {
                return this._time;
            },
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._time = this.totoalTime;
    },

    start () {
        this.startTimer();
    },

    startTimer(){
        if (this.totoalTime > 0) {
            this.schedule(this.updateTimer, 1, this.totoalTime);
        }
    },

    updateTimer(){
        this._time = this._time - 1;
        // cc.log("==============Timer: %d", this._time);
    },

    // update (dt) {},
});
