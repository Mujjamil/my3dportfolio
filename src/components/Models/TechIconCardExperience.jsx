import { Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const TechIconCardExperience = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }
    if (model.name === "Java Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          // Apply a custom shader material to all meshes of the model so the backing fills the cutouts seamlessly
          const material = new THREE.MeshStandardMaterial({
            roughness: 0.2,
            metalness: 0.8,
          });

          material.onBeforeCompile = (shader) => {
            shader.vertexShader = shader.vertexShader.replace(
              `#include <common>`,
              `#include <common>
               varying vec3 vPosition;`
            );
            shader.vertexShader = shader.vertexShader.replace(
              `#include <begin_vertex>`,
              `#include <begin_vertex>
               vPosition = position;`
            );
            shader.fragmentShader = shader.fragmentShader.replace(
              `#include <common>`,
              `#include <common>
               varying vec3 vPosition;`
            );
            shader.fragmentShader = shader.fragmentShader.replace(
              `vec4 diffuseColor = vec4( diffuse, opacity );`,
              `
              // Java red: #e11e25
              // Java blue (darker shade to counter lighting): #002255
              vec3 steamColor = vec3(0.906, 0.118, 0.145); // #e11e25
              vec3 cupColor = vec3(0.0, 0.13, 0.33);       // #002255
              
              // Transition threshold at local y = -0.15
              float factor = smoothstep(-0.2, -0.1, vPosition.y);
              vec3 finalColor = mix(cupColor, steamColor, factor);
              
              vec4 diffuseColor = vec4( finalColor, opacity );
              `
            );
          };

          child.material = material;
        }
      });
    }
  }, [scene]);

  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
      />
      <Environment preset="city" />

      {/* 
        The Float component from @react-three/drei is used to 
        create a simple animation of the model floating in space.
        The rotationIntensity and floatIntensity props control the
        speed of the rotation and float animations respectively.

        The group component is used to scale and rotate the model.
        The rotation is set to the value of the model.rotation property,
        which is an array of three values representing the rotation in
        degrees around the x, y and z axes respectively.

        The primitive component is used to render the 3D model.
        The object prop is set to the scene object returned by the
        useGLTF hook, which is an instance of THREE.Group. The
        THREE.Group object contains all the objects (meshes, lights, etc)
        that make up the 3D model.
      */}
      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={scene.scene} />
        </group>
      </Float>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;