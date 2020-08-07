"use strict";
var Snake;
(function (Snake) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    // ƒ.RenderManager.initialize(true, true);
    window.addEventListener("load", hndLoad);
    Snake.size = 7;
    Snake.mtrStandard = new ƒ.Material("Cube", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("white")));
    let snake;
    let enemy;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.Debug.log(canvas);
        let graph = new ƒ.Node("Game");
        snake = new Snake.Snake();
        graph.addChild(snake);
        enemy = new Snake.Enemy();
        graph.addChild(enemy);
        Snake.items = new ƒ.Node("Items");
        graph.addChild(Snake.items);
        for (let i = 0; i < 20; i++)
            placeFood();
        let cube = new ƒAid.Node("Cube", ƒ.Matrix4x4.SCALING(ƒ.Vector3.ONE(2 * Snake.size - 1)), Snake.mtrStandard, new ƒ.MeshCube());
        cube.getComponent(ƒ.ComponentMaterial).clrPrimary = new ƒ.Color(0.4, 0.6, 0.3, 0.3);
        graph.addChild(cube);
        ƒAid.addStandardLightComponents(graph, new ƒ.Color(0.5, 0.5, 0.5));
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translate(new ƒ.Vector3(10, 10, 10));
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO(), ƒ.Vector3.Y(-1));
        cmpCamera.backgroundColor = ƒ.Color.CSS("white");
        Snake.viewport = new ƒ.Viewport();
        Snake.viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(Snake.viewport);
        document.addEventListener("keydown", control);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        snake.move();
        snake.eat();
        enemy.move();
        enemy.eat();
        moveCamera();
        Snake.viewport.draw();
    }
    function moveCamera() {
        let mtxHead = snake.head.mtxLocal;
        let posCamera = mtxHead.translation;
        posCamera.normalize(35);
        Snake.viewport.camera.pivot.translation = posCamera;
        // let up: ƒ.Vector3 = ƒ.Vector3.X();
        // up.transform(mtxHead, false);
        Snake.viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO());
        // viewport.camera.pivot.lookAt(ƒ.Vector3.ZERO(), up);
    }
    function control(_event) {
        let rotation = ƒ.Vector3.ZERO();
        switch (_event.code) {
            case ƒ.KEYBOARD_CODE.ARROW_RIGHT:
                rotation = ƒ.Vector3.Y(-90);
                break;
            case ƒ.KEYBOARD_CODE.ARROW_LEFT:
                rotation = ƒ.Vector3.Y(90);
                break;
            case ƒ.KEYBOARD_CODE.SPACE:
                rotation = ƒ.Vector3.Z(-90);
                break;
            // case ƒ.KEYBOARD_CODE.A:
            //   viewport.camera.pivot.translateX(-0.5);
            //   break;
            // case ƒ.KEYBOARD_CODE.D:
            //   viewport.camera.pivot.translateX(0.5);
            //   break;
            default:
                return;
        }
        snake.rotate(rotation);
    }
    function placeFood() {
        let position = new ƒ.Vector3(ƒ.Random.default.getRangeFloored(-Snake.size, Snake.size), ƒ.Random.default.getRangeFloored(-Snake.size, Snake.size), ƒ.Random.default.getSign() * Snake.size);
        position.shuffle();
        let food = new ƒAid.Node("Food", ƒ.Matrix4x4.TRANSLATION(position), Snake.mtrStandard, new ƒ.MeshCube());
        food.getComponent(ƒ.ComponentMaterial).clrPrimary = ƒ.Color.CSS("red");
        Snake.items.addChild(food);
    }
})(Snake || (Snake = {}));
//# sourceMappingURL=Main.js.map