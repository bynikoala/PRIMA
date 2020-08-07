namespace Snake {
    import ƒ = FudgeCore;

    export class World extends ƒ.Node {

        constructor() {
            super("Block");
            console.log("Creating Block");
            let mesh: ƒ.MeshCube = new ƒ.MeshCube();
            let mtrGrey: ƒ.Material = new ƒ.Material("SolidGray", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("GREY")));
            let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(mtrGrey);
            let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);

            let block: ƒ.Node = new ƒ.Node("Block");

            cmpMesh.pivot.scale(ƒ.Vector3.ONE(13));
            block.addComponent(cmpMesh);
            block.addComponent(cmpMaterial);

            block.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, 0))));

            this.appendChild(block);
        }

        

        public getFood(): void {
            let mouse: ƒ.Node;

            let foodMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(new ƒ.MeshCube());
            let foodMtr: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED"))));

            mouse.addComponent(foodMesh);
            mouse.addComponent(foodMtr);

            mouse.addComponent(new ƒ.ComponentTransform(ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(-1, 7, 6))));
        }
    }
}