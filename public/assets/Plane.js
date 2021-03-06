/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef,useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Canvas, useLoader,useThree } from '@react-three/fiber';
import { MeshBasicMaterial } from 'three';


export default function Model({ ...props }) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, '/plane.gltf')
  const { nodes, materials, animations,scene } = gltf
  const { actions } = useAnimations(animations, group)
  const material =  useTexture('/planeUnwrap.jpg')
  material.flipY = false;
  material.encoding = THREE.sRGBEncoding
  const mt = new THREE.MeshBasicMaterial({map:material})
 // useLayoutEffect(()=>{
 //   scene.traverse(c=>{
 //     c.material = material
 //   })
 // },[scene,material])
  
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Circle" rotation={[Math.PI / 2, 0, 0]} scale={[0.35, 1, 0.35]}>
        <mesh geometry={nodes.Circle001_1.geometry} material={nodes.Circle001_1.material} material-map={material} />
        <mesh geometry={nodes.Circle001_2.geometry} material={materials.windows} material-map={material} />
        <mesh geometry={nodes.Circle001_3.geometry} material={nodes.Circle001_3.material} material-map={material}/>
      </group>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0.35, 1, 0.35]}>
        <mesh geometry={nodes.Circle002_1.geometry} material={nodes.Circle002_1.material} material-map={material}/>
        <mesh geometry={nodes.Circle002_2.geometry} material={nodes.Circle002_2.material} material-map={material}/>
      </group>
      <mesh
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        material-map={material}
        position={[0, -0.02, -0.08]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.35, 1, 0.35]}
      />
      <group name="Plane" position={[0, 0.76, -2.07]} scale={[0.83, 1, 1]}>
        <mesh geometry={nodes.Plane004.geometry} material={nodes.Plane004.material} material-map={material} />
        <mesh geometry={nodes.Plane004_1.geometry} material={nodes.Plane004_1.material} material-map={material}/>
      </group>
      <group position={[0, 0, 0.86]} rotation={[Math.PI / 2, 0, 0]} scale={[0.35, 1, 0.35]}>
        <mesh geometry={nodes.Circle004.geometry} material={materials.wheel} material-map={material} />
        <mesh geometry={nodes.Circle004_1.geometry} material={nodes.Circle004_1.material} material-map={material}/>
        <mesh geometry={nodes.Circle004_2.geometry} material={nodes.Circle004_2.material} material-map={material}/>
      </group>
      <mesh
        name="Circle006"
        geometry={nodes.Circle006.geometry}
        material={nodes.Circle006.material}
        material-map={material}
        position={[0, -0.02, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.25}>
        <mesh
          name="Plane001"
          geometry={nodes.Plane001.geometry}
          material-map={material}
          material={nodes.Plane001.material}
          position={[0, 0.25, 0]}
          scale={[0.38, 0.78, 0.4]}
        />
        <mesh
          name="Plane002"
          geometry={nodes.Plane002.geometry}
          material-map={material}
          material={nodes.Plane002.material}
          position={[0, 0.25, 0]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={[0.38, 0.56, 0.4]}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/plane.glb')
