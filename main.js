import './style.css'
import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { arraySlice } from 'three/src/animation/AnimationUtils';


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render( scene, camera)

const ringTexture = new THREE.TextureLoader().load('saturn.jpg')
const ringParticleTexture = new THREE.TextureLoader().load('ringparticle.jpg')



const geometry =  new THREE.TorusGeometry( 10, 1, 2, 100 );
const material = new THREE.MeshStandardMaterial({ 
  
  map: ringTexture,
  normalMap: ringParticleTexture

});

const torus = new THREE.Mesh( geometry, material)

const pointLight =  new THREE.PointLight( 0xffffff, 1, 100 );
pointLight.position.set( 0, 0, 5 );
scene.add(pointLight)

const light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

const lightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(lightHelper)

const gridHelper = new THREE.GridHelper( 200 , 50)


const controls = new OrbitControls( camera, renderer.domElement );

scene.add(torus)

renderer.render( scene, camera);

function addstar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addstar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const jeffTexture = new THREE.TextureLoader().load('sushant.jpeg')

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial(  { map: jeffTexture})
)
scene.add(jeff)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( 
    {
      map: moonTexture,
      normalMap: normalTexture
    }
    
    )

);

moon.position.z = 22
moon.position.setX(10)
scene.add(moon)

function moveCamera(){

  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05; 
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.01;
  camera.position.y = t * -0.001;
}
document.body.onscroll = moveCamera


function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += 0.005;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;


  controls.update();

  renderer.render(scene, camera);

  

}
animate()

