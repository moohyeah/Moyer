// 移动组件 
cc.Class({
    extends: cc.Component,

    properties: {
        // obj:{
        //     default:null,
        //     type: require("SceneObject")
        // },
        //目标
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
        if (!this.moving) {
            return
        }
        var dir = this._targetPos.sub(this.node.position).normalize()
        // 根据当前加速度方向每帧更新速度
        // if (this.accLeft) {
        //     this.speed -= this.accel * dt;
        // } else if (this.accRight) {
        //     this.speed += this.accel * dt;
        // }
        // // 限制主角的速度不能超过最大值
        // if ( Math.abs(this.speed) > this.maxMoveSpeed ) {
        //     // if speed reach limit, use max speed with current direction
        //     this.speed = this.maxMoveSpeed * this.speed / Math.abs(this.speed);
        // }

        this.speed = this.maxMoveSpeed;
        var moveDist = dir.mul(dt * this.speed);
        // cc.log("=============moving dir", dt, dt * this.speed); 
        // 根据当前速度更新主角的位置
        // this.node.x += this.xSpeed * dt;
        this.node.position =  this.node.position.add(moveDist);
    },
});
