"use strict";
var Snake;
(function (Snake) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.Debug.log(canvas);
        let snake = new Snake.Snake();
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.rotateY(180);
        Snake.viewport = new f.Viewport();
        Snake.viewport.initialize("Viewport", snake, cmpCamera, canvas);
        f.Debug.log(Snake.viewport);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(f.LOOP_MODE.TIME_REAL, 5);
    }
    function update(_event) {
        Snake.viewport.draw();
    }
})(Snake || (Snake = {}));
//# sourceMappingURL=Main.js.map