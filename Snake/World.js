"use strict";
var Snake;
(function (Snake) {
    var ƒ = FudgeCore;
    class World extends ƒ.Node {
        constructor() {
            super("Block");
            console.log("Creating Block");
            let mesh = new ƒ.MeshCube();
            let mtrGrey = new ƒ.Material("SolidGray", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("GREY")));
            let cmpMaterial = new ƒ.ComponentMaterial(mtrGrey);
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            let block = new ƒ.Node("Block");
            cmpMesh.pivot.scale(ƒ.Vector3.ONE(13));
            block.addComponent(cmpMesh);
            block.addComponent(cmpMaterial);
            block.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));
            this.appendChild(block);
        }
        getFood() {
            let mouse;
            let foodMesh = new ƒ.ComponentMesh(new ƒ.MeshCube());
            let foodMtr = new ƒ.ComponentMaterial(new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED"))));
            mouse.addComponent(foodMesh);
            mouse.addComponent(foodMtr);
            mouse.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1, 7, 6))));
        }
    }
    Snake.World = World;
})(Snake || (Snake = {}));
//# sourceMappingURL=World.js.map