// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        id:0,
        // 移动速度，敏捷
        maxSpeed:0,
        // 加速度
        accel:0,
        // 小短腿根据不同场景对象的优先级进行反应
        priority:0,
        // 是否有效
        aviable: true,
        // 0不受影响 1增益 2减益
        effectByCourage:0,
        //惊吓消耗体力
        scaredCostPower:0,
        //惊吓后退距离
        scaredBackDis:10,
        scene: {
            get() {
                return this._scene;
            },
        }
    },
    
    onLoad () {
        // 注冊到scene
        this._scene = cc.find("scene").getComponent("Scene");
        this._scene.register(this);
    },
});
