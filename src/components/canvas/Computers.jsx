import {Suspense, useEffect, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'
const Computers = ({ isMobile }) => {
  //функция useGLTF можем ипортировать 3D модели
  const computer = useGLTF('./desktop_pc/scene.gltf')//первым параметром принимает путь к 3D модели
  return (
    <mesh>{/*readme.txt строка 1*/}
      <hemisphereLight intensity={0.15}
        groundColor="black"/>{/*readme.txt 4 строка*/}
      <pointLight intensity={1} /> {/*readme.txt 7 строка*/}
      <spotLight /*readme.txt 22 строка*/
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      /> 
      <primitive /*readme.txt 11 строка*/ 
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    //проверяем открыт ли наш сайт с телефона
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)//срабатывает тогда, когда размер нашего window(viewport) поменялся

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  },[])
  return (
    <Canvas 
      frameloop='demand' 
      shadows
      camera={{
        position: [20, 3, 5],//позиция где находится камера (3 цифры - координати по x,y,z)
        fov: 25//field of view определяет насколько широким должно быть наше поле для обзора
      }}
      gl={{preserveDrawingBuffer: true}}>
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls /*readme.txt 14строка */
           enableZoom={false}
           //такая комбинация значений вертикальных углов наклона запретит вращать камеру по вертикали 
           maxPolarAngle={Math.PI / 2} //readme.txt 16 строка
           minPolarAngle={Math.PI / 2} //readme.txt 19 строка
          />
          <Computers isMobile={isMobile}/>
        </Suspense>
        <Preload all/>
    </Canvas>
  )
}

export default ComputersCanvas