import {useFrame, useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/addons";
import {useEffect} from "react";
import {Mesh} from "three";

// This work is based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)

export function Car() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "models/car/scene.gltf"
  )

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    })
  }, [gltf])


  // rotating wheels
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const group = gltf.scene.children[0].children[0].children[0];
    if (group) {
      group.children[0].rotation.x = t * 2
      group.children[2].rotation.x = t * 2
      group.children[4].rotation.x = t * 2
      group.children[6].rotation.x = t * 2
    }
  });

  return <primitive object={gltf.scene}/>
}
