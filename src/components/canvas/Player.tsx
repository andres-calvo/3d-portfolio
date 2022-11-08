import { useSphere } from '@react-three/cannon'
import React, { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useKeyboardInput } from '../../hooks/use-keyboard-input'
// import { useMouseInput } from '../hooks/useMouseInput'
import { useVariable } from '../../hooks/use-variable'
import { Raycaster } from 'three'

/** Player movement constants */
const speed = 3
const bulletSpeed = 30
const bulletCoolDown = 300
const jumpSpeed = 5
const jumpCoolDown = 400

const Player = () => {
  /** Player collider */
  const [sphereRef, api] = useSphere(() => ({
    mass: 100,
    fixedRotation: true,
    position: [0, 10, 0],
    args: [0.2],
    material: {
      friction: 0,
    },
  }))
  /** Bullets */
  //   const [bullets, setBullets] = useState([])

  /** Input hooks */
  const pressed = useKeyboardInput(['w', 'a', 's', 'd', ' '])
  //   const pressedMouse = useMouseInput()

  /** Converts the input state to ref so they can be used inside useFrame */
  const input = useVariable(pressed)
  //   const mouseInput = useVariable(pressedMouse)

  /** Player movement constants */
  const { camera, scene } = useThree()

  /** Player state */
  const state = useRef({
    timeToShoot: 0,
    timeTojump: 0,
    vel: [0, 0, 0],
    jumping: false,
  })

  useEffect(() => {
    api.velocity.subscribe((v) => (state.current.vel = v))
  }, [api])
  const moveForward = (distance, vec) => {
    vec.setFromMatrixColumn(camera.matrix, 0)
    vec.crossVectors(camera.up, vec)
    camera.position.addScaledVector(vec, distance)
  }
  const moveRight = (distance, vec) => {
    vec.setFromMatrixColumn(camera.matrix, 0)
    camera.position.addScaledVector(vec, distance)
  }
  /** Player loop */
  useFrame((_, delta) => {
    /** Handles movement */
    const { w, s, a, d } = input.current
    const space = input.current[' ']

    let velocity = new Vector3(0, 0, 0)
    let cameraDirection = new Vector3()
    camera.getWorldDirection(cameraDirection)

    let forward = new Vector3()
    forward.setFromMatrixColumn(camera.matrix, 0)
    forward.crossVectors(camera.up, forward)

    let right = new Vector3()
    right.setFromMatrixColumn(camera.matrix, 0)

    if (w) moveForward(delta * speed, forward)
    if (a) moveRight(-delta * speed, right)
    if (s) moveForward(-delta * speed, forward)
    if (d) moveRight(delta * speed, right)
  })

  return (
    <mesh ref={sphereRef} scale={1}>
      <sphereGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}
export default Player
/**
 * 
 * {bullets.map((bullet) => {
        return <Bullet key={bullet.id} velocity={bullet.forward} position={bullet.position} />
      })}
 * 
 */
