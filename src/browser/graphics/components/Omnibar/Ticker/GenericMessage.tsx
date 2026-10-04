import { ScrollingMessage } from "./ScrollingMessage";

interface Props {
  timeout: number;
  message: string;
  onEnd: () => void;
  onScrollingNeeded?: (needsScrolling: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const OmnibarGenericMessage = (props: Props) => (
  <ScrollingMessage {...props} />
);
