
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
        this._scene =  cc.find("Canvas").getComponent("Scene");
        this.radius = (this._obj.curiosity * 0.1 + 1);
        this._target = null;
    },
    
    setListener(listener){
        this._listener = listener
    },

    getTarget(){
        var target;
        var targetDis;
        var objs = this._scene.objs;
        if (objs == null) {
            return null;
        }
        for (let index = 0; index < objs.length; index++) {
            const element = objs[index];
            if (element.aviable) {
                var dis = this._obj.node.position.sub(element.node.position).mag
                if (dis <= radius) {
                    if (target == null) {
                        target = element;
                        targetDis = dis;
                    } else if(this._obj.getpPiority(target) < this._obj.getpPiority(element)){
                        arget = element;
                        targetDis = dis;
                    } else if(this._obj.getpPiority(target) == this._obj.getpPiority(element) && targetDis < dis){
                        arget = element;
                        targetDis = dis;
                    }
                }
            }
        }

        return target
    },

    update (dt) {
        var oldTarget = this._target;
        this._target = this.getTarget();
        if (oldTarget != this._target && this._listener) {
            this._listener(this._target);
        }
    },
});
