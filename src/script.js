import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import building from './building.jpg';
import building2 from './building2.jpg';
import grass from './grass.jpg'
import { Raycaster, Vector3 } from 'three';
import { plot } from './Heatmap';


// Renderer++++++++++++++++++++++++++++++++++++++++++
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Scene+++++++++++++++++++++++++++++++++++++++++++++++++++
const scene = new THREE.Scene();

//Texture Loader

const textureLoader = new THREE.TextureLoader();

// Axes Helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
axesHelper.position.y = 10;
axesHelper.position.x = 0;
axesHelper.position.z = 0;



// Objects++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let objects = [];


//Ground
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshPhongMaterial({
    color: 0x9D6055,
    side: THREE.DoubleSide,

})
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -0.5 * Math.PI;
ground.receiveShadow = true;
scene.add(ground);

//park
const parkGeometry = new THREE.PlaneGeometry(4, 6)
const parkmaterial = new THREE.MeshStandardMaterial({
    color: 0x7CFC00,
    side: THREE.DoubleSide,
    map: textureLoader.load(grass)
})
const park = new THREE.Mesh(parkGeometry, parkmaterial)
park.position.z = ground.position.z + 6;
park.position.y = ground.position.y + 0.1;
park.rotation.x = -0.5 * Math.PI;
park.receiveShadow = true;
scene.add(park);

// Building Big 
const bigBuildGeometry = new THREE.BoxGeometry(1, 6, 1);
const bigBuildMaterial = new THREE.MeshPhongMaterial({
    // color :0x808077,
    wireframe: false,
    map: textureLoader.load(building)
});
const bigBuild = new THREE.Mesh(bigBuildGeometry, bigBuildMaterial);
bigBuild.position.set(-3, 3, 5);
// bigBuild.position.y =2;
bigBuild.castShadow = true;
bigBuild.receiveShadow = true;
scene.add(bigBuild);
objects.push(bigBuild);

// Building2 
const building2geometry = new THREE.BoxGeometry(1, 8, 5)
const building2Material = new THREE.MeshPhongMaterial({
    // color :0x808077,
    wireframe: false,
    map: textureLoader.load(building2)
});

const building3 = new THREE.Mesh(building2geometry, building2Material);
building3.position.x = 4;
building3.position.y = 4;
building3.position.z = 5;
// building3.position.y = 6;
building3.castShadow = true;
building3.receiveShadow = true;
objects.push(building3);
scene.add(building3);

// Building Abstract

const absBuildGeometry = new THREE.SphereGeometry(2, 3, 3);
const absBuildMaterial = new THREE.MeshStandardMaterial({
    color: 0x225522,
    wireframe: false
});
const absBuild1 = new THREE.Mesh(absBuildGeometry, absBuildMaterial);
absBuild1.position.set(8, 1.5, 0);
absBuild1.castShadow = true;
absBuild1.receiveShadow = true;
scene.add(absBuild1);
objects.push(absBuild1);

// Building Big 4

const bigBuild4 = new THREE.Mesh(bigBuildGeometry, bigBuildMaterial);
bigBuild4.position.set(-4, 3, 8);

bigBuild4.castShadow = true;
bigBuild4.receiveShadow = true;
scene.add(bigBuild4);
objects.push(bigBuild4);

// Building 5

const building5 = new THREE.Mesh(bigBuildGeometry, bigBuildMaterial);
building5.position.set(5, 2, -3);
building5.scale.y = 2;
building5.castShadow = true;
building5.receiveShadow = true;
scene.add(building5);
objects.push(building5);

//add buildings on click

let buildingGeometry = new THREE.BoxGeometry(1, 3, 1);

// materials

let redBuildingMaterial = new THREE.MeshStandardMaterial({
    // color :0x808077,
    wireframe: false,
    map: textureLoader.load(building2)
});

let whiteBuildingMaterial = new THREE.MeshStandardMaterial({
    // color :0x808077,
    wireframe: false,
    map: textureLoader.load(building)
});

// create building mesh

let redBuilding = new THREE.Mesh(buildingGeometry, redBuildingMaterial);
redBuilding.position.y = 0.5;
redBuilding.position.x = 6;
redBuilding.position.z = 5;
let whiteBuilding = new THREE.Mesh(buildingGeometry, whiteBuildingMaterial);


// adding objects

let redBuild = document.querySelector(".redBuilding");
let whiteBuild = document.querySelector(".whiteBuilding");

redBuild.onclick = () => {
    addNewObject(redBuilding);
};

whiteBuild.onclick = () => {
    addNewObject(whiteBuilding);
};

let addNewObject = (object) => {
    let newObject = object.clone();

    newObject.position.x = 0;
    newObject.position.y = newObject.scale.y / 2;
    newObject.position.z = 0;
    scene.add(newObject);
    objects.push(newObject);
    console.log(objects.length)
};

for (let i = 0; i < objects.length; i++) {
    objects[i].castShadow = true;
    objects[i].receiveShadow = true;
    // objects[i].position.y = objects[i].scale.y / 2;
}

// Building 6 
const building6 = new THREE.Mesh(buildingGeometry, redBuildingMaterial);
building6.position.set(0, 2, -3);
building6.scale.y = 2;
building6.scale.x = 2;
building6.castShadow = true;
building6.receiveShadow = true;
scene.add(building6);
objects.push(building6);

//Building 7
const building7 = new THREE.Mesh(buildingGeometry, whiteBuildingMaterial);
building7.position.set(8, 3, 8);
building7.scale.y = 2;
building7.scale.x = 2;
building7.castShadow = true;
building7.receiveShadow = true;
scene.add(building7);
objects.push(building7);

// Building 8
const building8 = new THREE.Mesh(buildingGeometry, redBuildingMaterial);
building8.position.set(-4, 3, 8);
building8.scale.y = 1;
building8.scale.x = 2;
building8.castShadow = true;
building8.receiveShadow = true;
scene.add(building8);
objects.push(building8);

// Building 9
const building9 = new THREE.Mesh(buildingGeometry, redBuildingMaterial);
building9.position.set(-7, 1, 5);
building9.scale.y = 0.5;
building9.scale.z = 4;
building9.castShadow = true;
building9.receiveShadow = true;
scene.add(building9);
objects.push(building9);

// Building 10
const building10 = new THREE.Mesh(buildingGeometry, redBuildingMaterial);
building10.position.set(-7, 2, 1);
building10.scale.y = 2;
building10.scale.z = 4;
building10.castShadow = true;
building10.receiveShadow = true;
scene.add(building10);
objects.push(building10);

// Building11
const buildig11 = new THREE.Mesh(buildingGeometry, whiteBuildingMaterial);
buildig11.position.set(-8, 3, -3.5);
buildig11.scale.y = 2.5;
buildig11.scale.z = 4;
buildig11.scale.x = 2.5;
buildig11.castShadow = true;
buildig11.receiveShadow = true;
scene.add(buildig11);
objects.push(buildig11);

// Buildin12
const buildin12 = new THREE.Mesh(buildingGeometry, whiteBuildingMaterial);
buildin12.position.set(0, 2, -8);
buildin12.scale.y = 1.2;
buildin12.scale.z = 1;
buildin12.scale.x = 10;
buildin12.castShadow = true;
buildin12.receiveShadow = true;
scene.add(buildin12);
objects.push(buildin12);


const gridHelper = new THREE.GridHelper(30, 30);
// scene.add(gridHelper);

// Sizes+++++++++++++++++++++++++++++++++++++++++++++++++
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(6, 8, 20);
scene.add(camera);

const cameraTop = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
cameraTop.position.set(0, 15, 0);
cameraTop.rotateX(-Math.PI * 0.5);
scene.add(cameraTop);

//Lights++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Directional Light
const directionLight = new THREE.DirectionalLight();
directionLight.position.set(30, 30, 0);
directionLight.castShadow = true;
directionLight.shadow.camera.bottom = -12;
directionLight.shadow.camera.top = 10;
directionLight.shadow.camera.left = -10;
directionLight.shadow.camera.right = 10;
scene.add(directionLight);

const dLightHelper = new THREE.DirectionalLightHelper(directionLight, 3);
scene.add(dLightHelper);


const dShawdowHelper = new THREE.CameraHelper(directionLight.shadow.camera);
// scene.add(dShawdowHelper);

// Controls++++++++++++++++++++++++++++++++++++++++++++++++++

// OrbitControls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

//transform Controls

const transformControls = new TransformControls(camera, renderer.domElement); // transform controls

transformControls.addEventListener('dragging-changed', function (event) {

    orbit.enabled = !event.value;
});

// transform objects

let selected;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

var intersects = [];

renderer.domElement.addEventListener("click", onClick);

function onClick(event) {
    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(event.clientX, event.clientY)


    raycaster.setFromCamera(mouse, camera);

    intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        selected = intersects[0].object;

        transformControls.attach(selected)


    }

}
scene.add(transformControls);

// change transformation type

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 69) {
        transformControls.setMode('scale');


    } else if (keyCode == 82) { // R
        scene.remove(selected);
    } else if (keyCode == 87) { // W
        transformControls.setMode('translate');
    } else if (keyCode == 81) { // Q
        transformControls.detach(selected);
    }

}

// Light intensity calculation++++++++++++++++++++++++++++++++++++++++++

let points = [];
let a = new Vector3(5, 0, 5);
let b = new Vector3(5, 0, -5);
let c = new Vector3(-5, 0, 5);
let d = new Vector3(-5, 0, -5);
points.push(a, b, c, d);
let laserGeometry;
let laserMaterial

laserGeometry = new THREE.BoxGeometry(1, 1, 1);
laserMaterial = new THREE.MeshBasicMaterial({
    color: 0xCCCC66,
    wireframe: false,

});

let lightObject = [];

let lightBuildingA = new THREE.Mesh(laserGeometry, laserMaterial);
lightBuildingA.position.x = 5;
lightBuildingA.position.y = 0;
lightBuildingA.position.z = 5;
scene.add(lightBuildingA);

let lightBuildingB = new THREE.Mesh(laserGeometry, laserMaterial);
lightBuildingB.position.x = 5;
lightBuildingB.position.y = 0;
lightBuildingB.position.z = -5;
scene.add(lightBuildingB);

let lightBuildingC = new THREE.Mesh(laserGeometry, laserMaterial);
lightBuildingC.position.x = -5;
lightBuildingC.position.y = 0;
lightBuildingC.position.z = 5;
scene.add(lightBuildingC);

let lightBuildingD = new THREE.Mesh(laserGeometry, laserMaterial);
lightBuildingD.position.x = -5;
lightBuildingD.position.y = 0;
lightBuildingD.position.z = -5;
scene.add(lightBuildingD);

lightObject.push(lightBuildingA, lightBuildingB, lightBuildingC, lightBuildingD);
console.log(lightObject);

// Shadow Heatmap++++++++++++++++++++++++++++++++++++++++++++++

let parkPoints = [];
for (let i = 0; i < 35; i++) {
    let r = Math.floor(i / 5);
    let c = i % 5;
    let point = new Vector3(c - 2, 0, r + 3);
    parkPoints.push(point);

}
console.log(parkPoints);
export let shadowDensityList = new Array(5).fill().map(() => Array(7).fill(0));

let zValues = ['-2', '-1', '0', '1', '2'];

let xValues = ['3', '4', '5', '6', '7', '8', '9'];

let data = [
    {
        x: xValues,
        y: zValues,
        z: shadowDensityList,
        type: 'heatmap'
    }
];

let heatLayout =
{
    title: {
        text: 'Shadow Heatmap showing the units of time period a point is in shadow ',
        font: {
            family: 'Courier New, monospace',
            size: 16
        },
    },
    xaxis: {
        title: 'Z-Axis position in scene'
    },
    yaxis: {
        title: 'X-Axis position in scene'
    }

}


// animate+++++++++++++++++++++++++++++++++++++++++++++++++++++++

function animate() {

    if (directionLight.position.x > -31) {
        directionLight.position.x -= 0.1;
        let lightIntensity;
        let normal = new Vector3(0, 1, 0);
        let baycaster = new THREE.Raycaster();

        for (let i = 0; i < points.length; i++) {
            let p = new Vector3;



            baycaster.set(points[i], p.subVectors(directionLight.position, points[i]).normalize());

            let x = baycaster.intersectObjects(objects);
            let ray = baycaster.ray;

            let radian = ray.direction.angleTo(normal);



            if (x.length == 0) {
                lightIntensity = Math.abs(Math.cos(radian));

            } else {
                lightIntensity = 0.2;

            }


            lightObject[i].scale.y = 8 * lightIntensity;

            lightObject[i].position.y = lightObject[i].scale.y / 2;

        }


        let daycaster = new Raycaster();
        for (let i = 0; i < parkPoints.length; i++) {
            let r = Math.floor(i / 5);
            let c = i % 5;
            let p = new Vector3;
            daycaster.set(parkPoints[i], p.subVectors(directionLight.position, parkPoints[i]).normalize());
            let x = daycaster.intersectObjects(objects);
            // scene.add(new THREE.ArrowHelper( daycaster.ray.direction, daycaster.ray.origin, 100, 0xffffff ));
            if (x.length > 0) {
                shadowDensityList[c][r] += 1;
            }
        }

        plot(data, heatLayout);

    }




    renderer.render(scene, camera);



}




renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});