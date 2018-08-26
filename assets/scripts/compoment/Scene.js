
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
        this._status = SceneStatus.idle;
    },

    start () {
        this.timer = this.getComponent("timer");
    },

    update (dt) {
        if (this.timer.leftTime <= 0 && this._status == SceneStatus.idle) {
            this.gameOver();
        }
    },

    register(obj) {
        this._objs[obj.id] = obj;
    },

    unregister(obj) {
        this._objs[obj.id] = null;
        delete this._objs[obj.id];
    },

    gameOver(){
        this._status = SceneStatus.failed;
        cc.log("GameOver==============")
    },
});
