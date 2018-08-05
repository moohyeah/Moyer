
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
        this._curScene = this.getComponent("Scene");
        this._time = this.totoalTime;
    },

    start () {
    },

    update (dt) {
        if (this._time <= 0 || this._curScene.status != 0) return;
        this._time -= dt;
    },
    // End LIFE-CYCLE CALLBACKS:

    timeStr(){
        return cc.js.formatStr("%s:%s", this.zeroize(parseInt(this._time/60)) ,  this.zeroize(parseInt(this._time%60)))
    },

    zeroize(value, length){
        if (!length) {  
            length = 2;  
        }  
        value = value + "";  
        for (var i = 0, zeros = ''; i < (length - value.length); i++) {  
            zeros += '0';  
        }  
        return zeros + value;  
    },
});
