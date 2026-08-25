import { useReplicant } from "@nodecg/react-hooks";
import TimeHelper from "../helpers";
import { render } from "../render";

const TimestampTable = () => {
  const [timestamps] = useReplicant<Timestamp[]>("timestamps", {
    defaultValue: [],
  });

  return (
    <div className="w-full overflow-hidden">
      <div className="grid grid-cols-[1fr_130px_110px]  bg-zinc-950/50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
        <div>Run</div>
        <div>Duration</div>
        <div>Setup</div>
      </div>

      <div>
        {(timestamps ?? []).map((timestamp) => {
          return (
            <div
              key={timestamp.id}
              className="group relative grid grid-cols-[1fr_130px_110px] items-center border-b border-zinc-800 px-4 py-3 last:border-b-0 hover:bg-zinc-800/40"
            >
              <div className="flex items-center gap-2 text-zinc-200">
                {timestamp.name}
              </div>

              <div className="font-mono text-sm tabular-nums">
                {timestamp.end != null ? (
                  <span className="text-zinc-300">
                    {TimeHelper.formatDuration(timestamp.end - timestamp.start)}
                  </span>
                ) : (
                  <span className="font-sans text-xs font-medium uppercase tracking-wide text-emerald-400">
                    Active
                  </span>
                )}
              </div>

              <div>
                {timestamp.setup != null ? (
                  <span className="font-mono text-sm tabular-nums">
                    {TimeHelper.formatDuration(timestamp.setup)}
                  </span>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </div>

              <div className="pointer-events-none absolute left-4 bottom-full z-10 mt-1 hidden w-max rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs shadow-lg group-hover:block">
                <div className="flex gap-4">
                  <div>
                    <span className="text-zinc-500">Start</span>
                    <div className="font-mono text-zinc-200">
                      {TimeHelper.formatTimeToHours(timestamp.start)}
                    </div>
                  </div>

                  <div>
                    <span className="text-zinc-500">End</span>
                    <div className="font-mono text-zinc-200">
                      {timestamp.end != null
                        ? TimeHelper.formatTimeToHours(timestamp.end)
                        : "Active"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

render(<TimestampTable />);
