// 体力
cc.Class({
    extends: cc.Component,

    properties: {
        // 最大体力值 满了不再回复
        maxPower:{
            set(value){
                this._maxPower = value;
                this._power = value;
                this.hasEmpty = value <= 0;
            },
            get(){
                return this._maxPower;
            }
        },
        // 消耗速度
        costSpeed:10,
        curPower:{
            get(){
                return Math.floor(this._power);
            }
        }
    },

    onPowerEmpty(listener){
        this._emptyListener = listener;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    //     this._power = this.maxPower;
    //     this.hasEmpty = false;
    // },

    add(p){
        this._power =  this._power + p;
        this._power = Math.min(this._power, this.maxPower);
        this._power = Math.max(0, this._power);
        this.hasEmpty = this._power <= 0;
    },

    start () {

    },

    update (dt) {
        if (this.hasEmpty) return;

        this._power = this._power - dt * this.costSpeed;

        if (this._power <= 0) {
            this._power = 0;
            this.hasEmpty = true;
            if (this._emptyListener) {
                this._emptyListener();
            }
        }
    },
});
