"use strict";
var TD;
(function (TD) {
    // import ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    window.addEventListener("load", hndLoad);
    TD.sizeTerrain = 20;
    TD.activeEnemies = [];
    TD.curEnemy = 0;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let graph = new ƒ.Node("Graph");
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translate(new ƒ.Vector3(20, 20, 20));
        cmpCamera.mtxPivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.clrBackground = ƒ.Color.CSS("lightblue");
        TD.viewport = new ƒ.Viewport();
        TD.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(TD.viewport);
        ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
        graph.addChild(new ƒAid.NodeCoordinateSystem());
        graph.addChild(createTerrain());
        TD.path = createPath();
        addTowersAndEnemiesFromJson(graph);
        TD.viewport.draw();
        // viewport.addEventListener(ƒ.EVENT_POINTER.MOVE, pointerMove);
        // viewport.activatePointerEvent(ƒ.EVENT_POINTER.MOVE, true);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        TD.enemyTimer = new ƒ.Timer(ƒ.Time.game, 1000, TD.enemyList.length, launchEnemy);
    }
    function addTowersAndEnemiesFromJson(_graph) {
        TD.towerList = [
            new TD.Tower("Tower1", ƒ.Vector3.Z(5)),
            new TD.Tower("Tower2", ƒ.Vector3.Z(-3)),
            new TD.Tower("Tower3", new ƒ.Vector3(5, 0, -3)),
            new TD.Tower("Tower4", new ƒ.Vector3(5, 0, 5)),
            new TD.Tower("Tower5", new ƒ.Vector3(-5, 0, -3)),
            new TD.Tower("Tower6", new ƒ.Vector3(-5, 0, 5))
        ];
        TD.enemyList = [
            new TD.Enemy("Enemy1", TD.path[0]),
            new TD.Enemy("Enemy2", TD.path[0]),
            new TD.Enemy("Enemy3", TD.path[0]),
            new TD.Enemy("Enemy4", TD.path[0])
        ];
        TD.towerList.forEach(tower => {
            _graph.addChild(tower);
        });
    }
    function launchEnemy() {
        if (TD.activeEnemies.length == TD.enemyList.length) {
            TD.enemyTimer.clear();
            return;
        }
        TD.activeEnemies.push(TD.enemyList[TD.curEnemy]);
        TD.viewport.getBranch().addChild(TD.enemyList[TD.curEnemy]);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, TD.enemyList[TD.curEnemy].update.bind(TD.enemyList[TD.curEnemy]));
        TD.curEnemy++;
    }
    function update(_event) {
        TD.towerList.forEach(tower => {
            TD.activeEnemies.forEach(enemy => {
                tower.follow(enemy);
            });
        });
        TD.viewport.draw();
        TD.path.render(TD.viewport);
    }
    function createTerrain() {
        let mtrPlane = new ƒ.Material("Plane", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("green")));
        let meshPlane = new ƒ.MeshQuad();
        let mtxPlane = ƒ.Matrix4x4.ROTATION_X(-90);
        mtxPlane.scale(ƒ.Vector3.ONE(TD.sizeTerrain));
        let plane = new ƒAid.Node("Plane", mtxPlane, mtrPlane, meshPlane);
        return plane;
    }
    function createPath() {
        let path = new TD.Path();
        for (let i = 0; i <= TD.sizeTerrain * .8; i++) {
            path.push(new ƒ.Vector3(i - TD.sizeTerrain / 2, 0, ƒ.Random.default.getRange(TD.sizeTerrain + 8, TD.sizeTerrain + 12) / 4));
        }
        for (let i = 0; i <= TD.sizeTerrain * .55; i++) {
            path.push(new ƒ.Vector3(ƒ.Random.default.getRange(TD.sizeTerrain + 8, TD.sizeTerrain + 12) / 4, 0, TD.sizeTerrain / 2 - i - 5));
        }
        for (let i = 0; i <= TD.sizeTerrain * .75; i++) {
            path.push(new ƒ.Vector3(TD.sizeTerrain / 2 - i - 5, 0, ƒ.Random.default.getRange(TD.sizeTerrain - 43, TD.sizeTerrain - 48) / 4));
        }
        return path;
    }
})(TD || (TD = {}));
//# sourceMappingURL=Main.js.map