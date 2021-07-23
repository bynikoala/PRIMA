"use strict";
var TD;
(function (TD) {
    var ƒAid = FudgeAid;
    class Tower extends ƒ.Node {
        constructor(_name, _pos) {
            super(_name);
            this.stage = 1;
            this.health = 1;
            this.strength = 50;
            this.range = 4;
            this.rate = 500;
            this.timer = new ƒ.Timer(ƒ.Time.game, this.rate, 0, this.fire.bind(this));
            let base = new ƒAid.Node("Base", null, Tower.material, Tower.meshBase);
            this.top = new ƒAid.Node("Top", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), Tower.material, Tower.meshTop);
            let mtxTop = this.top.getComponent(ƒ.ComponentMesh).mtxPivot;
            mtxTop.rotateZ(90);
            this.gun = new ƒAid.Node("Base", ƒ.Matrix4x4.IDENTITY(), Tower.material, Tower.meshGun);
            let mtxGun = this.gun.getComponent(ƒ.ComponentMesh).mtxPivot;
            mtxGun.scale(new ƒ.Vector3(0.1, 0.1, 1));
            mtxGun.translateZ(0.5);
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
            this.addChild(base);
            this.addChild(this.top);
            this.top.addChild(this.gun);
        }
        follow(_enemy) {
            this.target = _enemy;
            if (this.mtxLocal.translation.isInsideSphere(this.target.mtxLocal.translation, this.range)) {
                this.top.cmpTransform.lookAt(_enemy.mtxWorld.translation, ƒ.Vector3.Y());
            }
        }
        fire() {
            if (this.target == null) {
                return;
            }
            if (this.mtxLocal.translation.isInsideSphere(this.target.mtxLocal.translation, this.range)) {
                let projectile = new TD.Projectile(this.top.mtxWorld.translation, this.target, this);
                TD.viewport.getBranch().addChild(projectile);
            }
        }
        upgrade() {
            this.stage++;
            this.range += 3;
            this.rate -= 250;
            this.strength += 0.1;
            this.health++;
        }
    }
    Tower.material = new ƒ.Material("Tower", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.5, 0.5, 0.5)));
    Tower.meshBase = new ƒ.MeshPyramid();
    Tower.meshTop = new ƒ.MeshSphere("Body", 10, 4);
    Tower.meshGun = new ƒ.MeshCube();
    TD.Tower = Tower;
})(TD || (TD = {}));
//# sourceMappingURL=Tower.js.map