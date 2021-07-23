"use strict";
var TD;
(function (TD) {
    class Projectile extends ƒ.Node {
        constructor(_start, _target, _tower) {
            super("Projectile");
            this.target = _target;
            this.tower = _tower;
            this.speed = 10 / 1000;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_start)));
            let cmpMaterial = new ƒ.ComponentMaterial(Projectile.material);
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(Projectile.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.mtxPivot.scale(ƒ.Vector3.ONE(0.2));
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        update(_event) {
            let position = this.mtxLocal.translation;
            let distance = ƒ.Vector3.DIFFERENCE(this.target.mtxLocal.translation, position);
            let distanceToTravel = this.speed * ƒ.Loop.timeFrameGame;
            let travel = ƒ.Vector3.NORMALIZATION(distance, distanceToTravel);
            this.mtxLocal.translate(travel);
            if (position.isInsideSphere(this.target.mtxLocal.translation, 0.18)) {
                this.getParent().removeChild(this);
                this.target.reduceHealth(this.tower);
            }
        }
    }
    Projectile.material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.4, 0.4, 0.4)));
    Projectile.mesh = new ƒ.MeshCube();
    TD.Projectile = Projectile;
})(TD || (TD = {}));
//# sourceMappingURL=Projectiles.js.map