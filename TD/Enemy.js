"use strict";
var TD;
(function (TD) {
    class Enemy extends ƒ.Node {
        constructor(_name, _pos) {
            super(_name);
            this.health = 1;
            this.stamina = 1;
            this.speed = 4 / 1000;
            this.nextWaypoint = 0;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
            let cmpMaterial = new ƒ.ComponentMaterial(Enemy.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("lightblue");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(Enemy.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(0.5));
            cmpMesh.pivot.translateY(0.5);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update.bind(this));
        }
        update(_event) {
            // via mutator for demonstration
            let distanceToTravel = this.speed * ƒ.Loop.timeFrameGame;
            let move;
            while (true) {
                move = ƒ.Vector3.DIFFERENCE(TD.path[this.nextWaypoint], this.mtxLocal.translation);
                if (move.magnitudeSquared > distanceToTravel * distanceToTravel)
                    break;
                this.nextWaypoint = ++this.nextWaypoint % (TD.sizeTerrain * 2 + 4);
                if (this.nextWaypoint == 0)
                    this.mtxLocal.translation = TD.path[0];
            }
            this.mtxLocal.translate(ƒ.Vector3.NORMALIZATION(move, distanceToTravel));
        }
    }
    Enemy.material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
    Enemy.mesh = new ƒ.MeshSphere(4, 2);
    TD.Enemy = Enemy;
})(TD || (TD = {}));
//# sourceMappingURL=Enemy.js.map