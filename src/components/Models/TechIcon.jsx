import React from 'react'
import { Environment, Float, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const TechIcon = ({model}) => {
    const scene = useGLTF(model.modelPath)
  return (
    <Canvas>
        <ambientLight intensity={0.3}/>
        <directionalLight position={[5,5,5]} intensity={1}/>

        <Environment preset='city'/>
        <OrbitControls zoom0={false}/>

        <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
            <group scale={model.scale}>
                <primitive object={scene.scene} rotation={model.rotation}/>
            </group>
        </Float>
    </Canvas>
  )
}

export default TechIcon
