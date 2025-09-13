import { useReplicant } from '@nodecg/react-hooks';
import { Commentator } from '../../types/commentators';


function useCommentators() {
  const [commentators] = useReplicant<Commentator[]>('commentators');

  return commentators ?? '';
}

export default useCommentators;