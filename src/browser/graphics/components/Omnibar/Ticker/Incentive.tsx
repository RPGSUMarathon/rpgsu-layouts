import { useEffect } from "react";
import { Helpers } from "../../../../helpers";
import usePolls from "../../../../hooks/usePolls";
import { OmnibarGenericMessage } from "./GenericMessage";

interface Props {
  timeout: number;
  onEnd: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
      })[character]!,
  );

export const Incentive = ({ timeout, onEnd, containerRef }: Props) => {
  const { activePolls } = usePolls();
  const incentive = activePolls[0];

  useEffect(() => {
    if (!incentive) {
      onEnd();
    }
  }, [incentive, onEnd]);

  if (!incentive) {
    return null;
  }

  const options = incentive.options
    .map(
      (option) =>
        `${option.name} - ${Helpers.formatAmount(option.amount, option.currency)}`,
    )
    .join(", ");
  const message = `<span class="text-[#bbeee8ff] font-bold">Next incentive</span>: ${escapeHtml(incentive.name)} - ${escapeHtml(options)}`;

  return (
    <OmnibarGenericMessage
      containerRef={containerRef}
      message={message}
      onEnd={onEnd}
      timeout={timeout}
    />
  );
};
