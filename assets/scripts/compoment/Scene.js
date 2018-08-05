
var SceneStatus = {
    idle : 0,
    success : 1,
    failed :2,
    pause: 3,
}
// 关卡对象，负责管理关卡中的进程以及保存关卡相关信息
cc.Class({
    extends: cc.Component,

    properties: {
        // 场景物件
        objs:{
            get(){
                return this._objs;
            },
        },
        status: {
            get(){
                return this._status;
            },
        }
    },

    // TODO 关卡初始化工作
    onLoad () {
        this._objs = {};
        this.timer = this.getComponent("timer");
        this._status = SceneStatus.idle;
    },

    start () {
    },

    update (dt) {
        if (this.timer.leftTime <= 0) {
            this.gameOver();
        }
    },

    gameOver(){
        this._status = SceneStatus.failed;
        cc.log("GameOver==============")
    },
});
