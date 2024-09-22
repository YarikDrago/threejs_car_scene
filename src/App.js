import React, {Suspense} from "react";
import {Canvas} from "@react-three/fiber";
import {CubeCamera, Environment, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Ground} from "./Grounds";
import {Car} from "./Car";
import {Rings} from "./Rings";
import {Boxes} from "./Boxes";
import {Bloom, ChromaticAberration, DepthOfField, EffectComposer} from "@react-three/postprocessing";
import { BlendFunction } from 'postprocessing';
import {FloatingGrid} from "./FloatingGrid";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={Math.PI / 2}/>

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]}/>

      {/* let color = new Color(0, 0, 0); */}
      <color args={[0, 0, 0]} attach={"background"}/>

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
      <FloatingGrid/>

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
        position={[5, 5, 0]} // ползиция источника света в трехмерных координатах
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

      <EffectComposer>
        {/*<DepthOfField*/}
        {/*  focusDistance={0.0035} // focus distance*/}
        {/*  focalLength={0.01}*/}
        {/*  bokehScale={3}*/}
        {/*  height={480}*/}
        {/*/>*/}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.5} // The bloom intensity
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size [0, 5]
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>

    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow/>
      </Canvas>
    </Suspense>
  );
}

export default App;
