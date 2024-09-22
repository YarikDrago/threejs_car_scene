import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {CubeCamera, Environment, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Ground} from "./Grounds";
import {Car} from "./Car";
import {Rings} from "./Rings";
import {Boxes} from "./Boxes";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={Math.PI / 2} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      {/* let color = new Color(0, 0, 0); */}
      <color args={[0,0,0]} attach={"background"}/>

      {/*<Car/>*/}
      <CubeCamera resolution={256} frames={Infinity}>
        {/*texture - is what the cube camera is rendering*/}
        {(texture) => (
          <>
            <Environment map={texture}/>
            <Car/>
          </>
        )}
      </CubeCamera>
      <Rings/>
      <Boxes/>

      {/*
        let spotlight = new SpotLight();
        spotlight.intensity = 1.5;
        spotlight.position.set(...)
      */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={300} // яркость света
        angle={0.6} // угол распостранения света
        penumbra={0.5} // зона полутени источника света. 0 - полутень отсутствует
        position={[5,5,0]} // ползиция источника света в трехмерных координатах
        castShadow // разрешает источнику света отбрасывать тени
        shadow-bias={-0.0001} // смещение для теней
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={300}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        distance={30} // Увеличили расстояние света до 20 (или другое нужное значение)
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground/>

    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
