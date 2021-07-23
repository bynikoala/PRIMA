namespace TD {
  import ƒAid = FudgeAid;
  export class Tower extends ƒ.Node {
    private static material: ƒ.Material = new ƒ.Material("Tower", ƒ.ShaderFlat, new ƒ.CoatColored(new ƒ.Color(0.5, 0.5, 0.5)));
    private static meshBase: ƒ.MeshPyramid = new ƒ.MeshPyramid();
    private static meshTop: ƒ.MeshSphere = new ƒ.MeshSphere("Body", 10, 4);
    private static meshGun: ƒ.MeshCube = new ƒ.MeshCube();

    public stage: number = 1;
    public health: number = 1;
    public strength: number = 50;
    public range: number = 4;
    public rate: number = 500;

    public target: Enemy;
    public timer: ƒ.Timer = new ƒ.Timer(ƒ.Time.game, this.rate, 0, this.fire.bind(this));

    public top: ƒ.Node;
    private gun: ƒ.Node;

    constructor(_name: string, _pos: ƒ.Vector3) {
      super(_name);
      let base: ƒAid.Node = new ƒAid.Node("Base", null, Tower.material, Tower.meshBase);
      this.top = new ƒAid.Node("Top", ƒ.Matrix4x4.TRANSLATION(ƒ.Vector3.Y(1)), Tower.material, Tower.meshTop);
      let mtxTop: ƒ.Matrix4x4 = this.top.getComponent(ƒ.ComponentMesh).mtxPivot;
      mtxTop.rotateZ(90);
      this.gun = new ƒAid.Node("Base", ƒ.Matrix4x4.IDENTITY(), Tower.material, Tower.meshGun);
      let mtxGun: ƒ.Matrix4x4 = this.gun.getComponent(ƒ.ComponentMesh).mtxPivot;
      mtxGun.scale(new ƒ.Vector3(0.1, 0.1, 1));
      mtxGun.translateZ(0.5);

      this.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(_pos)));
      this.addChild(base);
      this.addChild(this.top);
      this.top.addChild(this.gun);
    }


    public follow(_enemy: Enemy): void {
      this.target = _enemy;

      if (!this.mtxLocal.translation.isInsideSphere(this.target.mtxLocal.translation, this.range)) {
        return;
      }

      this.top.cmpTransform.lookAt(_enemy.mtxWorld.translation, ƒ.Vector3.Y());
      
    }

    public fire(): void {

      if (this.target == null) {
        return;
      }

      let projectile: Projectile = new Projectile(this.top.mtxWorld.translation, this.target, this);
      viewport.getBranch().addChild(projectile);
    }


    public upgrade(): void {
      this.stage++;
      this.range += 3;
      this.rate -= 250;
      this.strength += 0.1;
      this.health++;
    }
  }
}