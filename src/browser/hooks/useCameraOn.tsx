import { useReplicant } from '@nodecg/react-hooks';

function useCameraOn() {
  const [cameraOn] = useReplicant<boolean>('cameraOn');

  return cameraOn ?? '';
}

export default useCameraOn;