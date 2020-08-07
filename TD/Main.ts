namespace TD {
  // import ƒ = FudgeCore;
  import ƒAid = FudgeAid;
  window.addEventListener("load", hndLoad);

  export let viewport: ƒ.Viewport;
  export let path: Path;
  export let sizeTerrain: number = 20;

  export let towerList: Tower[];
  export let enemyList: Enemy[];

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    let graph: ƒ.Node = new ƒ.Node("Graph");

    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.pivot.translate(new ƒ.Vector3(20, 20, 20));
    cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
    cmpCamera.backgroundColor = ƒ.Color.CSS("lightblue");

    viewport = new ƒ.Viewport();
    viewport.initialize("Viewport", graph, cmpCamera, canvas);
    ƒ.Debug.log(viewport);

    ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
    graph.addChild(new ƒAid.NodeCoordinateSystem());

    graph.addChild(createTerrain());
    path = createPath();

    addTowersAndEnemies(graph);


    viewport.draw();

    // viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, pointerMove);
    // viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);

    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
  }

  function addTowersAndEnemies(_graph: ƒ.Node): void {

    towerList = [
      new Tower("Tower1", ƒ.Vector3.Z(5)),
      new Tower("Tower2", ƒ.Vector3.Z(-3)),
      new Tower("Tower3", new ƒ.Vector3(5, 0, -3)),
      new Tower("Tower4", new ƒ.Vector3(5, 0, 5)),
      new Tower("Tower5", new ƒ.Vector3(-5, 0, -3)),
      new Tower("Tower6", new ƒ.Vector3(-5, 0, 5))
    ];
    enemyList = [
      new Enemy("Enemy1", path[0]),
      new Enemy("Enemy2", path[0])
    ];

    towerList.forEach(tower => {
      _graph.addChild(tower);
    });
    enemyList.forEach(enemy => {
      _graph.addChild(enemy);
    });

  }

  function update(_event: ƒ.Eventƒ): void {
    enemyList.forEach(enemy => {
      towerList.forEach(tower => {
        tower.follow(enemy);
      });
    });
    
    viewport.draw();
    path.render(viewport);
  }

  function createTerrain(): ƒ.Node {
    let mtrPlane: ƒ.Material = new ƒ.Material("Plane", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("green")));
    let meshPlane: ƒ.MeshQuad = new ƒ.MeshQuad();
    let mtxPlane: ƒ.Matrix4x4 = ƒ.Matrix4x4.ROTATION_X(-90);
    mtxPlane.scale(ƒ.Vector3.ONE(sizeTerrain));
    let plane: ƒAid.Node = new ƒAid.Node("Plane", mtxPlane, mtrPlane, meshPlane);
    return plane;
  }

  function createPath(): Path {
    let path: Path = new Path();
    for (let i: number = 0; i <= sizeTerrain * .8; i++) {
      path.push(new ƒ.Vector3(i - sizeTerrain / 2, 0, ƒ.Random.default.getRange(sizeTerrain + 8, sizeTerrain + 12) / 4));
    }
    for (let i: number = 0; i <= sizeTerrain * .55; i++) {
      path.push(new ƒ.Vector3(ƒ.Random.default.getRange(sizeTerrain + 8, sizeTerrain + 12) / 4, 0, sizeTerrain / 2 - i - 5));
    }
    for (let i: number = 0; i <= sizeTerrain * .75; i++) {
      path.push(new ƒ.Vector3(sizeTerrain / 2 - i - 5, 0, ƒ.Random.default.getRange(sizeTerrain - 43, sizeTerrain - 48) / 4));
    }
    return path;
  }
}