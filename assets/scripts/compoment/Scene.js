// 关卡对象，负责管理关卡中的进程以及保存关卡相关信息
cc.Class({
    extends: cc.Component,

    properties: {
        // 场景物件
        objs:{
            get(){
                return this._objs;
            },
        }
    },

    // TODO 关卡初始化工作
    onLoad () {
        this._objs = {}
    },

    start () {

    },

    // update (dt) {},
});
