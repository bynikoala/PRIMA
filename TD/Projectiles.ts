namespace TD {
  export class Projectile extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Projectile", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.4,0.4,0.4)));
    private static mesh: ƒ.MeshCube = new ƒ.MeshCube();
    public speed: number;
    public target: Enemy;
    public tower: Tower;

    constructor(_start: ƒ.Vector3, _target: Enemy, _tower: Tower) {
      super("Projectile");
      this.target = _target;
      this.tower = _tower;
      this.speed = 10/1000;

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_start)));

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Projectile.material);
      this.addComponent(cmpMaterial);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Projectile.mesh);
      this.addComponent(cmpMesh);
      cmpMesh.mtxPivot.scale(ƒ.Vector3.ONE(0.2));

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.update.bind(this));
    }

    private update(_event: ƒ.Eventƒ): void {
      let position: ƒ.Vector3 = this.mtxLocal.translation;
      let distance: ƒ.Vector3 = ƒ.Vector3.DIFFERENCE(this.target.mtxLocal.translation, position);
      let distanceToTravel: number = this.speed * ƒ.Loop.timeFrameGame;
      let travel: ƒ.Vector3 = ƒ.Vector3.NORMALIZATION(distance, distanceToTravel);
      this.mtxLocal.translate(travel);

      if (position.isInsideSphere(this.target.mtxLocal.translation, 0.18)) {
        this.getParent().removeChild(this);
        this.target.reduceHealth(this.tower);
      }
    }

  }
}