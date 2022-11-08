import { useThree, extend } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

extend({ PointerLockControls })

const Controls = () => {
  const { camera, gl } = useThree()
  const controls = useRef()

  useEffect(() => {
    camera.layers.enable(0)
    camera.layers.enable(1)
  }, [camera])

  useEffect(() => {
    const handleFocus = () => {
      //@ts-ignore
      controls.current.lock()
    }
    document.addEventListener('click', handleFocus)

    return () => {
      document.removeEventListener('click', handleFocus)
    }
  }, [gl])
  //@ts-ignore
  return <pointerLockControls ref={controls} args={[camera, gl.domElement]} />
}
export default Controls
