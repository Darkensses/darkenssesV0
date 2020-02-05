import React, { useMemo, useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { useThree, Canvas, useFrame, extend } from "react-three-fiber"
import { noise, map } from '../../utils/PerlinNoise'

//Effects
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  FilmPass,
  UnrealBloomPass,
  GlitchPass,
})

function EffectTV() {
  const { gl, scene, camera, size } = useThree()
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [
    size,
  ])
  const { width, height } = size
  const composer = useRef()
  const renderTarget = useMemo(() => {
    new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBFormat,
      stencilBuffer: true,
    })
  })

  useEffect(() => {
    void composer.current.setSize(width, height)
  }, [width, height])
  useFrame(() => composer.current.render(), 2)

  return (
    <effectComposer ref={composer} args={[gl, renderTarget]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <shaderPass attachArray="passes" args={[GammaCorrectionShader]} />
      <unrealBloomPass attachArray="passes" args={[aspect, 1, 1, 0]} />
      <filmPass attachArray="passes" args={[0.25, 0.4, 1500, false]} />
      <glitchPass attachArray="passes" factor={0.5} />
    </effectComposer>
  )
}

function RattlesnakeMesh(props) {
  const [theta, setTheta] = useState(0)
  const [perlinNoise, setPerlinNoise] = useState([])
  const mesh = useRef()
  //const camera = useRef();
  //const { size, setDefaultCamera, scene } = useThree();

  //00BCD4
  const planeGeo = useMemo(
    () => new THREE.PlaneGeometry(150, 300, 100, 100),
    []
  )
  const planeMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 0xff0000,
      })
  )

  //scene.background = new THREE.Color(0x1c1c1c);

  useEffect(() => {
    //void setDefaultCamera(camera.current);
    console.log(planeGeo.vertices.length)
    for (let i = 0; i < planeGeo.vertices.length; i++) {
      const { x, y } = planeGeo.vertices[i]
      const noiseValue = map(noise(x / 15, y / 15), 0, 1, -10, 10)
      setPerlinNoise(oldArray => [...oldArray, noiseValue])
      planeGeo.vertices[i].z = noiseValue
    }
  }, [])

  useFrame(() => {
    //camera.current.updateMatrixWorld();
    setTheta(theta + 0.45)
    perlinNoise.forEach((noiseVal, index) => {
      const planeIndex = Math.floor((index + theta) % planeGeo.vertices.length)
      planeGeo.vertices[planeIndex].z = noiseVal
    })

    planeGeo.verticesNeedUpdate = true
  })
  return (
    <mesh
      ref={mesh}
      geometry={planeGeo}
      material={planeMat}
      rotation={[-Math.PI / 3, 0, (270 * Math.PI) / 180]}
      position={[0, 0, 0]}
      castShadow={true}
      receiveShadow={true}
    />
  )
}

function Plane({ ...props }) {
  return (
    <mesh {...props} receiveShadow>
      <planeGeometry attach="geometry" args={[5000, 5000, 1, 1]} />
      <meshLambertMaterial
        attach="material"
        color="#000000"
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

function Rattlesnake() {
  const d = 8.25;
    return (
      <Canvas gl2 camera={{ position: [0, 10, 15], fov: 115 }}>
        <fog attach="fog" args={[0x00, 35, 65]} />
        <hemisphereLight
          skyColor={"black"}
          groundColor={0xffffff}
          intensity={0.1}
          position={[0, 10, 15]}
        />
        <directionalLight
          position={[-8, 12, 8]}
          shadow-camera-left={d * -1}
          shadow-camera-bottom={d * -1}
          shadow-camera-right={d}
          shadow-camera-top={d}
          shadow-camera-near={0.1}
          shadow-camera-far={1500}
          castShadow
        />
        <Plane rotation={[0, 0, 0]} position={[0, 10, -40]} />
        <RattlesnakeMesh />
        <EffectTV />
      </Canvas>
    )
}

export default Rattlesnake;