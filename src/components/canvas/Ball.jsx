import React, {Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Decal, Float, OrbitControls, Preload, useTexture
} from '@react-three/drei'
import CanvasLoader from '../Loader'
import { MeshStandardMaterial } from 'three'

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]) //readme.txt 25 cтрока
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25}/>{/*readme.txt 31 cтрока*/}
      <directionalLight position={[0, 0, 0.05]}/> {/*readme.txt 34 cтрока*/}
      <mesh castShadow receiveShadow scale={2.75}> {/*readme.txt 40 cтрока*/}
        <icosahedronGeometry args={[1,1]}/> {/*readme.txt 37 cтрока*/}
        <meshStandardMaterial color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal map={decal}
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
        />
      </mesh>
    </Float>
  )
}
const BallCanvas = ({ icon }) => {
  return (
    <Canvas 
      frameloop='demand' 
      gl={{preserveDrawingBuffer: true}}>
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls /*readme.txt 14строка */
           enableZoom={false}
          />
          <Ball imgUrl={icon}/>
        </Suspense>
        <Preload all/>
    </Canvas>
  )
}
export default BallCanvas