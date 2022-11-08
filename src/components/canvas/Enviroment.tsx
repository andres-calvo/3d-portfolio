import { useEnvironment, Environment } from '@react-three/drei'

const EnvironmentScene = () => {
  const envMap = useEnvironment({ path: '/hdr' })

  return <Environment map={envMap} background />
}

export default EnvironmentScene
