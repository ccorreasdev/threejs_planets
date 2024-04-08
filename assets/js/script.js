import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");

let object1, object2, object3;
let camera, scene, renderer, controls;
let mouse = new THREE.Vector2();

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

const onMouseMove = (e) => {
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

const init = () => {

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 9);

    camera.lookAt(0, 1, 0);

    scene = new THREE.Scene();

    const light = new THREE.HemisphereLight(0xffffff, 0x888888, 3);
    light.position.set(0, 1, 0);
    scene.add(light);

    const geometry = new THREE.IcosahedronGeometry(0.5, 3);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.enableZoom = true;
    // controls.enablePan = true;

    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        './assets/js/models/planet/scene.gltf',
        // called when the resource is loaded
        function (gltf) {

            object1 = gltf.scene;
            gltf.scene.position.x = 0.5;
            gltf.scene.rotation.y = Math.PI / 2;


            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            scene.add(gltf.scene);
        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );

    // Load a glTF resource
    loader.load(
        // resource URL
        './assets/js/models/lava_planet/scene.gltf',
        // called when the resource is loaded
        function (gltf) {

            object2 = gltf.scene;



            gltf.scene.rotation.y = (Math.PI / 2) / 2;
            gltf.scene.position.x = 5;
            gltf.scene.position.z = 0;
            gltf.scene.rotation.x = (Math.PI / 2) / 1;

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            scene.add(gltf.scene);
            gltf.scene.scale(0.5, 0.5, 0.5);

        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );

    // Load a glTF resource
    loader.load(
        // resource URL
        './assets/js/models/lava_planet/scene.gltf',
        // called when the resource is loaded
        function (gltf) {


            object3 = gltf.scene;
            gltf.scene.rotation.y = -(Math.PI / 2) / 2;
            gltf.scene.position.x = -4;
            gltf.scene.position.z = 0;


            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene; // THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object
            scene.add(gltf.scene);
            gltf.scene.scale(0.5, 0.5, 0.5);
        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );

    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onMouseMove);
};

const render = () => {
    renderer.render(scene, camera);
};


let planet1Go = true;
let planet2Go = true;
let planet3Go = true;

const animate = () => {
    requestAnimationFrame(animate);
    object1.rotation.y += 0.008;
    object2.rotation.x += 0.007;
    object3.rotation.y += 0.005;

    if (planet1Go) {
        object1.position.y += 0.005;
    } else {
        object1.position.y -= 0.005;
    }

    if (object1.position.y >= 2) {
        planet1Go = false;
    } else if (object1.position.y <= -2) {
        planet1Go = true;
    }

    if (planet2Go) {
        object2.position.y += 0.0025;
    } else {
        object2.position.y -= 0.0025;
    }

    if (object2.position.y >= 2) {
        planet2Go = false;
    } else if (object2.position.y <= -2) {
        planet2Go = true;
    }

    if (planet3Go) {
        object3.position.y += 0.0025;
    } else {
        object3.position.y -= 0.0025;
    }

    if (object3.position.y >= 2) {
        planet3Go = false;
    } else if (object3.position.y <= -2) {
        planet3Go = true;
    }



    //controls.update();
    render();

};

option1.addEventListener("click", (e) => {
    const finalPosition = { x: 0, y: 5, z: 7 };
    gsap.to(camera.position, { duration: 1, x: finalPosition.x, y: finalPosition.y, z: finalPosition.z });
    gsap.to(camera.rotation, { duration: 1, y: 0.25 });
});

option2.addEventListener("click", (e) => {
    const finalPosition = { x: 0, y: 5, z: 9 };
    gsap.to(camera.position, { duration: 1, x: finalPosition.x, y: finalPosition.y, z: finalPosition.z });
    gsap.to(camera.rotation, { duration: 1, y: 0 });
});

option3.addEventListener("click", (e) => {
    const finalPosition = { x: 0, y: 5, z: 7 };
    gsap.to(camera.position, { duration: 1, x: finalPosition.x, y: finalPosition.y, z: finalPosition.z });
    gsap.to(camera.rotation, { duration: 1, y: -0.25 });

});


init();
animate();

