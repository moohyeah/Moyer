
cc.Class({
    extends: cc.Component,

    properties: {
        target:{
            get(){
                return this._target;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this._obj = this.getComponent("Cat");
        this.radius = (this._obj.curiosity * 10 + 100);
        this._target = null;
    },
    
    setListener(listener){
        this._listener = listener
    },

    setTarget(){
        if (!this._obj.canRadar()) {
            return;
        }
        var target;
        var targetDis;
        var objs = this._obj.scene.objs;
        if (objs == null) {
            return null;
        }
        for (const key in objs) {
            if (objs.hasOwnProperty(key)) {
                const element = objs[key];
                if (element.aviable) {
                    var dis = this._obj.node.position.sub(element.node.position).mag();
                    if (dis <= this.radius) {
                        if (target == null) {
                            target = element;
                            targetDis = dis;
                        } else if(this._obj.getPiority(target) < this._obj.getPiority(element)){
                            target = element;
                            targetDis = dis;
                        } else if(this._obj.getPiority(target) == this._obj.getPiority(element) && targetDis < dis){
                            target = element;
                            targetDis = dis;
                        }
                    }
                }
            }
        }

        this._target = target
    },

    update (dt) {
        var oldTarget = this._target;
        this.setTarget();
        if (oldTarget != this._target && this._listener) {
            this._listener(this._target);
        }
    },
});
