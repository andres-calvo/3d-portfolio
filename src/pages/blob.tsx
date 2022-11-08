import dynamic from 'next/dynamic'
import { Physics } from '@react-three/cannon'
import { Sky, Stars } from '@react-three/drei'
import { Suspense } from 'react'

const Desert = dynamic(() => import('@/components/canvas/Desert'), { ssr: false })
const Player = dynamic(() => import('@/components/canvas/Player'), { ssr: false })
const Controls = dynamic(() => import('@/components/canvas/Controls'), { ssr: false })
const Environment = dynamic(() => import('@/components/canvas/Enviroment'), { ssr: false })
export default function Page(props) {
  return <></>
}

Page.canvas = (props) => {
  return (
    <>
      {/** @ts-ignore Pointer lock  */}
      <Controls />
      {/** Lighting */}
      <ambientLight intensity={0.2} />
      <Stars />
      {/* <Sky distance={45000000} sunPosition={[1, 0, 0]} inclination={0.2} azimuth={0.1} /> */}
      <Physics gravity={[0, -9, 0]} tolerance={0} iterations={50} broadphase={'SAP'}>
        <Player />
        <Suspense fallback={null}>
          <Desert position-y={-0.75} />
        </Suspense>
      </Physics>
    </>
  )
}

export async function getStaticProps() {
  return { props: { title: 'Blob' } }
}
