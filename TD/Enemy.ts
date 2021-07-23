namespace TD {
  export class Enemy extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Enemy", ƒ.ShaderFlat, new ƒ.CoatColored());
    private static mesh: ƒ.MeshSphere = new ƒ.MeshSphere("Body", 4, 2);

    public speed: number = 4 / 1000;
    public nextWaypoint: number = 0;
    private health: number = 200;

    constructor(_name: string, _pos: ƒ.Vector3) {
      super(_name);
      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Enemy.material);
      cmpMaterial.clrPrimary = ƒ.Color.CSS("lightblue");
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Enemy.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.mtxPivot.scale(ƒ.Vector3.ONE(0.5));
      cmpMesh.mtxPivot.translateY(0.5);
    }

    public update(_event: ƒ.Eventƒ): void {
      // via mutator for demonstration
      let distanceToTravel: number = this.speed * ƒ.Loop.timeFrameGame;
      let move: ƒ.Vector3;
      while (true) {
        move = ƒ.Vector3.DIFFERENCE(path[this.nextWaypoint], this.mtxLocal.translation);
        if (move.magnitudeSquared > distanceToTravel * distanceToTravel)
          break;

        this.nextWaypoint = ++this.nextWaypoint % (sizeTerrain * 2 + 4);
        if (this.nextWaypoint == 0)
          this.mtxLocal.translation = path[0];
      }

      this.mtxLocal.translate(ƒ.Vector3.NORMALIZATION(move, distanceToTravel));
    }

    public reduceHealth(_tower: Tower): void {
      this.health -= _tower.strength;
      if (this.health <= 0) {
        this.removeEnemy(_tower);
      }
    }

    private removeEnemy(_tower: Tower): void {
      let _index: number = activeEnemies.indexOf(this);
      if (_index > -1) {
        activeEnemies.splice(_index, 1);
      }
      this.getParent().removeChild(this);
      _tower.target = null;
    }
  }
}