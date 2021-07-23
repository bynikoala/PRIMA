"use strict";
var TD;
(function (TD) {
    class Enemy extends ƒ.Node {
        constructor(_name, _pos) {
            super(_name);
            this.speed = 4 / 1000;
            this.nextWaypoint = 0;
            this.health = 200;
            this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
            let cmpMaterial = new ƒ.ComponentMaterial(Enemy.material);
            cmpMaterial.clrPrimary = ƒ.Color.CSS("lightblue");
            this.addComponent(cmpMaterial);
            let cmpMesh = new ƒ.ComponentMesh(Enemy.mesh);
            this.addComponent(cmpMesh);
            cmpMesh.mtxPivot.scale(ƒ.Vector3.ONE(0.5));
            cmpMesh.mtxPivot.translateY(0.5);
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
        reduceHealth(_tower) {
            this.health -= _tower.strength;
            if (this.health <= 0) {
                this.removeEnemy(_tower);
            }
        }
        removeEnemy(_tower) {
            TD.activeEnemies.splice(TD.activeEnemies.indexOf(this), 1);
            this.getParent().removeChild(this);
        }
    }
    Enemy.material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
    Enemy.mesh = new ƒ.MeshSphere("Body", 4, 2);
    TD.Enemy = Enemy;
})(TD || (TD = {}));
//# sourceMappingURL=Enemy.js.map