import type { TiltifyPoll } from "@rpgsu-layouts/types";
import { useReplicant } from "@nodecg/react-hooks";
import { useMemo } from "react";

export default function () {
  const [polls] = useReplicant<TiltifyPoll[]>("polls", {
    bundle: "rpgsu-layouts",
  });

  const allPolls = useMemo(
    () =>
      [...(polls ?? [])].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      ),
    [polls],
  );

  const activePolls = useMemo(
    () => allPolls.filter((poll) => poll.active),
    [allPolls],
  );

  return { allPolls, activePolls };
}
