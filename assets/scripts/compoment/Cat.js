var Food = require("Food")
var Toy = require("Toy")

var CatStatus = {
    idle : 0,
    moving : 1,
    eating :2,
    playing:3,
    sleeping:4,
    scared:5,
}

// 小短腿在此
cc.Class({
    extends: require("SceneObject"),

    properties: {
        //好奇心，此属性影响小短腿发现新事件的距离
        curiosity:0,
        //勇气 此属性决定受到惊吓时的反应
        courage:0,
        // 勇气影响因子
        courageRate:0.1,
        // 体力 小短腿行动需要消耗体力
        costPower:0,
        // 最大体力
        maxPower:100,
        //睡觉增加的体力
        sleepAddPower:0,
        // 睡眠时间
        sleepTime:10,
        // 惊吓参数
        scaredRate:0.1,
        // 当前状态
        curStaus : {
            default: CatStatus.idle,
            type: cc.Enum(CatStatus),
        }
    },

    canRadar() {
        return this.curStaus  == CatStatus.idle || this.curStaus  == CatStatus.moving;
    },

    getPiority(obj){
        switch (obj.effectByCourage) {
            case 0:
                return obj.priority;
                break;
            case 1:
                return obj.priority + this.courage * this.courageRate;
                break;
            case 2:
                return obj.priority + this.courage * this.courageRate;
                break;                         
            default:
                return 0;
        }
    },

    sleep() {
        //TODO sleeping
        this.curStaus = CatStatus.sleeping;
        this.scheduleOnce(function(){
            this.power.add(this.sleepAddPower);
            this.curStaus = CatStatus.idle;
        }, this.sleepTime);
        
    },

    eat(food){
        this.curStaus = CatStatus.eating;
        this.scheduleOnce(function(){
            this.curStaus = CatStatus.idle;
            this.power.add(food.supplyPower);
        }, food.eatingTime);
    },

    play(toy){
        this.curStaus = CatStatus.playing;
        this.scheduleOnce(function(){
            this.curStaus = CatStatus.idle;
            this.power.add(toy.playingCost);
        }, toy.playTime);
    },

    scared() {
        this.curStaus = CatStatus.scared;
        var costPower = this._target.scaredCostPower - this.courage * this.scaredRate;
        costPower = Math.max(0, costPower);
        this.power.add(-1 * costPower);
        //TODO 惊吓移动
        var moveBackVec =cc.Vec2.RIGHT.mul(-1 * this._target.scaredBackDis);
        // cc.log("==============moveBack", moveBackVec);
        this.move.targetPos = this.node.position.add(moveBackVec);
    },

    targetLisnter(target) {
        this._target = target;
        if (target == null) {
            this.moveForward();
            return;
        }
        switch (target.effectByCourage) {
            case -1:
                this.scared();
                break;
            case 1:
                if (target instanceof Food) {
                    this.eat(target);
                } 
                else if(target instanceof Toy)
                {
                    this.play(target);
                }
            default:
                this.moveForward();
                break;
        }
    },

    moveForward() {
        var moveDisV = cc.Vec2.RIGHT.mul(this.maxSpeed * 10);
        this.move.targetPos = this.node.position.add(moveDisV);
        this.curStaus = CatStatus.moving;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    // },

    start () {

        var self = this;

        this.power = this.getComponent("Power");
        this.move = this.getComponent("Move");
        this.radar = this.getComponent("Radar");
        this.radar.setListener(function(target){
            self.targetLisnter(target);
        });
        this.power.maxPower = this.maxPower;
        this.move.maxMoveSpeed = this.maxSpeed;
        this.move.accel = this.accel;
    },

    update (dt) {
        switch (this.curStaus) {
            case CatStatus.idle:
                this.moveForward();
                break;
            case CatStatus.sleeping:
                return;
            case CatStatus.scared:
                if (!this.move.moving) {
                    cc.log("=============remove scared");
                    this.curStaus = CatStatus.idle;
                }
                return;    
            default:
                break;
        }
    },
});
