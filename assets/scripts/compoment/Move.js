// 移动组件 
cc.Class({
    extends: cc.Component,

    properties: {
        // 最大速度
        maxMoveSpeed:0,
        // 加速度
        accel:0,
        target:{
            // type:cc.Node,
            get(){
                return this._target;
            },
            set(value){
                this._target = value;
                this.moveType = 1;
            },
        },
        targetPos:{
            // type:cc.Vec2,
            get(){
                return this._targetPos;
            },
            set(value){
                //cc.log("Move to Target: ", value);
                this._targetPos = value;
                this.moveType = 2;
            },
        },
        moving:false,
        stoping:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.speed = 0;
        //移动停止最小误差
        this.minDist = 0.05;
        this._targetPos = this.node.position;
    },

    start () {

    },
    setTargetPos(){
        if (this.moveType == 1) {
            if (this._target != null) {
                this._targetPos = this._target.position
            }
        }
        var disV = this._targetPos.sub(this.node.position);

        //cc.log("==========setTargetPos", disV.mag(), this.minDist);
        this.moving = disV.mag() > this.minDist
    },
    update: function (dt) {
        this.setTargetPos()
        if (!this.moving) return;
        if (this.stoping) return;
        var dir = this._targetPos.sub(this.node.position).normalize()

        this.speed = this.maxMoveSpeed;
        var moveDist = dir.mul(dt * this.speed);

        this.node.position =  this.node.position.add(moveDist);
    },
});
