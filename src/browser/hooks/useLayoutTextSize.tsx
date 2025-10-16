import { useReplicant } from '@nodecg/react-hooks';

export function useGameTextSize() {
  const [gameTextSize] = useReplicant<string>('layoutGameTextSize');

  return gameTextSize ?? '';
}

export function useRunnerTextSize() {
  const [runnerTextSize] = useReplicant<string>('runnerTextSize');

  return runnerTextSize ?? '';
}

export function useCategoryTextSize() {
  const [categoryTextSize] = useReplicant<string>('categoryTextSize');

  return categoryTextSize ?? '';
}

//Instead of changing the commentator text, change the number of columns

export function useCommentatorColumnSize() {
  const [commentatorColumnSize] = useReplicant<number>('commentatorColumnSize');

  return commentatorColumnSize ?? -1;
}