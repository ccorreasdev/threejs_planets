import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const canvas = document.querySelector("#canvas");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const progress = document.querySelector("#progress");
const layout = document.querySelector("#layout");
let objectSpaceBoard;
let mouseOnScreen = false;
let object1, object2, object3, object4;
let object1Group = new THREE.Group();
let object2Group = new THREE.Group();
let object3Group = new THREE.Group();
let object4Group = new THREE.Group();
let camera, scene, renderer, controls;
let mouse = new THREE.Vector2();

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerWidth >= 768) {
        camera.position.set(0, 5, 9);
    }
    else if (window.innerWidth >= 500) {
        camera.position.set(0, 5, 12);
    } else if (window.innerWidth >= 400) {
        camera.position.set(0, 5, 15);
    }
    console.log(window.innerWidth);
};

const onMouseMove = (e) => {
    mouseOnScreen = true;
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

const onScroll = (e) => {
    var verticalScrollMax = Math.max(
        document.documentElement.scrollHeight, document.body.scrollHeight,
        document.documentElement.offsetHeight, document.body.offsetHeight,
        document.documentElement.clientHeight
    ) - window.innerHeight;
    const verticalScroll = window.scrollY;
    console.log(verticalScroll);
    const calculatedPositionObject1 = 5 - (((verticalScroll / verticalScrollMax) * 7));
    console.log(calculatedPositionObject1);
    const positionObject1 = { x: 0, y: calculatedPositionObject1, z: 9 };
    //gsap.to(camera.position, { duration: 1, x: finalPosition.x, y: finalPosition.y, z: finalPosition.z });
    gsap.to(camera.position, { duration: 1, x: positionObject1.x, y: positionObject1.y, z: positionObject1.z });


    const calculatedSpaceBoardX = (((verticalScroll / verticalScrollMax) * 24) - 12);
    const calculatedSpaceBoardY = (-((verticalScroll / verticalScrollMax) * 42) + 10);
    console.log("calculatedY: ", calculatedSpaceBoardY);

    const calculatedSpaceBoardRotationY = (((verticalScroll / verticalScrollMax) * 1.5));
    gsap.to(objectSpaceBoard.position, { duration: 1, x: calculatedSpaceBoardX, y: calculatedSpaceBoardY, z: 15 });
    gsap.to(objectSpaceBoard.rotation, { duration: 1, x: 0, y: calculatedSpaceBoardRotationY, z: 0 });
};

const init = async () => {

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 9);

    camera.lookAt(0, 1, 0);

    scene = new THREE.Scene();

    const light = new THREE.HemisphereLight(0xffffff, 0x888888, 3);
    light.position.set(0, 1, 0);
    scene.add(light);


    const ambientlight = new THREE.AmbientLight(0xffffff, 1);
    ambientlight.position.set(0, 10, 0);
    scene.add(ambientlight);

    const geometry = new THREE.IcosahedronGeometry(0.5, 3);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });


    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);

    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.enableZoom = true;
    // controls.enablePan = true;

    const loader = new GLTFLoader();

    const loadModel1 = () => {
        return new Promise((resolve, reject) => {



            // Load a glTF resource
            loader.load(
                // resource URL
                './assets/js/models/space_shuttle/scene.gltf',
                // called when the resource is loaded
                function (gltf) {

                    objectSpaceBoard = gltf.scene;
                    gltf.scene.position.x = -12;
                    gltf.scene.position.y = 10;
                    gltf.scene.rotation.x = 0;
                    gltf.scene.position.z = 15;

                    gltf.animations; // Array<THREE.AnimationClip>
                    gltf.scene; // THREE.Group
                    gltf.scenes; // Array<THREE.Group>
                    gltf.cameras; // Array<THREE.Camera>
                    gltf.asset; // Object
                    //scene.add(gltf.scene);

                    const container = new THREE.Group();

                    // Agrega el modelo a este contenedor
                    container.add(gltf.scene);

                    // Escala el contenedor
                    container.scale.set(0.2, 0.2, 0.2);
                    object1Group = container;
                    // Agrega el contenedor a la escena


                    resolve(object1Group);

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







        })
    };

    const loadModel2 = () => {
        return new Promise((resolve, reject) => {




            // Load a glTF resource
            loader.load(
                // resource URL
                './assets/js/models/planet/scene.gltf',
                // called when the resource is loaded
                function (gltf) {

                    gltf.scene.userData.id = "planet1";
                    object1 = gltf.scene;
                    gltf.scene.position.x = -1;
                    gltf.scene.rotation.y = Math.PI / 2;
                    gltf.scene.position.y = 1;

                    gltf.animations; // Array<THREE.AnimationClip>
                    gltf.scene; // THREE.Group
                    gltf.scenes; // Array<THREE.Group>
                    gltf.cameras; // Array<THREE.Camera>
                    gltf.asset; // Object
                    //scene.add(gltf.scene);

                    const container = new THREE.Group();

                    // Agrega el modelo a este contenedor
                    container.add(gltf.scene);

                    // Escala el contenedor
                    container.scale.set(2, 2, 2);

                    // Agrega el contenedor a la escena


                    object2Group = container;
                    resolve(object2Group);

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


        })


    }


    const loadModel3 = () => {
        return new Promise((resolve, reject) => {
            // Load a glTF resource
            loader.load(
                // resource URL
                './assets/js/models/aquaplanet.gltf',
                // called when the resource is loaded
                function (gltf) {


                    gltf.scene.position.x = 5;
                    gltf.scene.position.y = 2;
                    gltf.scene.rotation.x = 0.8;

                    gltf.animations; // Array<THREE.AnimationClip>
                    gltf.scene; // THREE.Group
                    gltf.scenes; // Array<THREE.Group>
                    gltf.cameras; // Array<THREE.Camera>
                    gltf.asset; // Object
                    //scene.add(gltf.scene);

                    const container = new THREE.Group();

                    // Agrega el modelo a este contenedor
                    container.add(gltf.scene);

                    // Escala el contenedor
                    container.scale.set(0.7, 0.7, 0.7);

                    // Agrega el contenedor a la escena


                    object3Group = container;
                    resolve(object3Group);

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


        })
    };



    const loadModel4 = () => {
        return new Promise((resolve, reject) => {
            // Load a glTF resource
            loader.load(
                // resource URL
                './assets/js/models/fireplanet.gltf',
                // called when the resource is loaded
                function (gltf) {


                    gltf.scene.position.x = 1;
                    gltf.scene.position.y = -13;
                    gltf.scene.rotation.x = 0.8;

                    gltf.animations; // Array<THREE.AnimationClip>
                    gltf.scene; // THREE.Group
                    gltf.scenes; // Array<THREE.Group>
                    gltf.cameras; // Array<THREE.Camera>
                    gltf.asset; // Object
                    //scene.add(gltf.scene);

                    const container = new THREE.Group();

                    // Agrega el modelo a este contenedor
                    container.add(gltf.scene);

                    // Escala el contenedor
                    container.scale.set(0.7, 0.7, 0.7);

                    // Agrega el contenedor a la escena


                    object4Group = container;
                    resolve(object4Group);

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



        })
    };


    const loadModel5 = () => {
        return new Promise((resolve, reject) => {

            // Load a glTF resource
            loader.load(
                // resource URL
                './assets/js/models/lava_planet/scene.gltf',
                // called when the resource is loaded
                function (gltf) {

                    object2 = gltf.scene;

                    gltf.scene.rotation.y = (Math.PI / 2) / 2;
                    gltf.scene.position.x = 3;
                    gltf.scene.position.z = 0;
                    gltf.scene.rotation.x = (Math.PI / 2) / 1;
                    gltf.scene.position.y = -4;

                    gltf.animations; // Array<THREE.AnimationClip>
                    gltf.scene; // THREE.Group
                    gltf.scenes; // Array<THREE.Group>
                    gltf.cameras; // Array<THREE.Camera>
                    gltf.asset; // Object

                    const container = new THREE.Group();

                    // Agrega el modelo a este contenedor
                    container.add(gltf.scene);

                    // Escala el contenedor
                    container.scale.set(2, 2, 2);

                    // Agrega el contenedor a la escena

                    resolve(container);

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


        })
    }



    const loadModel6 = () => {
        return new Promise((resolve, reject) => {


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
                    gltf.scene.position.y = -10;

                    gltf.animations; // Array<THREE.AnimationClip>
                    gltf.scene; // THREE.Group
                    gltf.scenes; // Array<THREE.Group>
                    gltf.cameras; // Array<THREE.Camera>
                    gltf.asset; // Object
                    resolve(gltf.scene);

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


        })
    }




    const loadModel7 = () => {
        return new Promise((resolve, reject) => {
            // Load a glTF resource
            loader.load(
                // resource URL
                './assets/js/models/nebula/scene.gltf',
                // called when the resource is loaded
                function (gltf) {

                    object4 = gltf.scene;
                    //object3 = gltf.scene;
                    gltf.scene.position.y = 0;
                    gltf.scene.position.x = 0;
                    gltf.scene.position.z = 0;


                    gltf.animations; // Array<THREE.AnimationClip>
                    gltf.scene; // THREE.Group
                    gltf.scenes; // Array<THREE.Group>
                    gltf.cameras; // Array<THREE.Camera>
                    gltf.asset; // Object

                    resolve(gltf.scene);


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


        })
    }



    let model1, model2, model3, model4, model5, model6, model7;


    await loadModel1().then((resolve) => {
        progress.innerHTML = "PROGRESS: 15%"
        console.log(resolve);
        model1 = resolve;
        return loadModel2();
    })
        .then((resolve) => {
            progress.innerHTML = "PROGRESS: 30%"
            console.log(resolve);
            model2 = resolve;
            return loadModel3();
        }).then((resolve) => {
            progress.innerHTML = "PROGRESS: 45%"
            console.log(resolve);
            model3 = resolve;
            return loadModel4();
        }).then((resolve) => {
            progress.innerHTML = "PROGRESS: 50%"
            console.log(resolve);
            model4 = resolve;
            return loadModel5();
        }).then((resolve) => {
            progress.innerHTML = "PROGRESS: 65%"
            console.log(resolve);
            model5 = resolve;
            return loadModel6();
        }).then((resolve) => {
            progress.innerHTML = "PROGRESS: 80%"
            console.log(resolve);
            model6 = resolve;
            return loadModel7();
        }).then((resolve) => {
            progress.innerHTML = "PROGRESS: 99%"
            console.log(resolve);
            model7 = resolve;
            progress.innerHTML = "PROGRESS: 100%"

        });

    scene.add(model1);
    scene.add(model2);
    scene.add(model3);
    scene.add(model4);
    scene.add(model5);
    scene.add(model6);
    scene.add(model7);


    progress.classList.remove("progress--active");



    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("scroll", onScroll);
};

const render = () => {
    renderer.render(scene, camera);
};


let planet1Go = true;
let planet2Go = true;
let planet3Go = true;
const raycaster = new THREE.Raycaster();
const animate = () => {
    requestAnimationFrame(animate);



    if (object1 && object2 && object3 && object4) {


        if (mouseOnScreen) {
            raycaster.setFromCamera(mouse, camera);
            const intersection = raycaster.intersectObjects(scene.children, true);

            if (intersection.length > 0) {

                if (intersection[0].object.name == "Object_6") {
                    const finalPosition = { x: 0, y: 5, z: 1 };
                    gsap.to(object1.position, { duration: 1, z: finalPosition.z });


                } else {
                    const finalPosition = { x: 0, y: 5, z: 0 };
                    gsap.to(object1.position, { duration: 1, z: finalPosition.z });
                }

                if (intersection[0].object.name == "clouds_clouds_0") {
                    const finalPosition = { x: 0, y: 5, z: 1 };
                    gsap.to(object2.position, { duration: 1, z: finalPosition.z });
                    gsap.to(object3.position, { duration: 1, z: finalPosition.z });

                } else {
                    const finalPosition = { x: 0, y: 5, z: 0 };
                    gsap.to(object2.position, { duration: 1, z: finalPosition.z });
                    gsap.to(object3.position, { duration: 1, z: finalPosition.z });
                }

            }
        }

        object4.rotation.y += 0.00022;
        object4.rotation.x += 0.00012;
        object1.rotation.y += 0.008;
        object2.rotation.x += 0.007;
        object3.rotation.y += 0.005;

        // if (planet1Go) {
        //     object1.position.y += 0.005;
        // } else {
        //     object1.position.y -= 0.005;
        // }

        // if (object1.position.y >= 2) {
        //     planet1Go = false;
        // } else if (object1.position.y <= -2) {
        //     planet1Go = true;
        // }

        // if (planet2Go) {
        //     object2.position.y += 0.0025;
        // } else {
        //     object2.position.y -= 0.0025;
        // }

        // if (object2.position.y >= 2) {
        //     planet2Go = false;
        // } else if (object2.position.y <= -2) {
        //     planet2Go = true;
        // }

        // if (planet3Go) {
        //     object3.position.y += 0.0025;
        // } else {
        //     object3.position.y -= 0.0025;
        // }

        // if (object3.position.y >= 2) {
        //     planet3Go = false;
        // } else if (object3.position.y <= -2) {
        //     planet3Go = true;
        // }

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

