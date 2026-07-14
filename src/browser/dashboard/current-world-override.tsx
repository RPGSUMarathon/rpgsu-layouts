import { useReplicant } from "@nodecg/react-hooks";
import { render } from "../render";

const worlds = [
  { id: "1", label: "Forest" },
  { id: "2", label: "Snow" },
  { id: "3", label: "Volcano" },
  { id: "4", label: "Desert" },
];

export const WorldSwitcher = () => {
  const [world, setWorld] = useReplicant<string>("currentWorld", {
    defaultValue: "1",
  });

  return (
    <div className="p-4 flex gap-2 flex-wrap bg-[#111]">
      {worlds.map((w) => (
        <button
          key={w.id}
          onClick={() => {
            setWorld(w.id);
            void nodecg.sendMessage("overrideWorld", w.label);
          }}
          className={`
            px-4 py-2 font-bold text-sm
            ridge-inner
            transition-all
            ${world === w.id ? "brightness-125 scale-105" : "opacity-70"}
          `}
          style={{
            background: "var(--color-bg)",
            color: "var(--color-main)",
          }}
        >
          {w.label}
        </button>
      ))}
    </div>
  );
};

render(<WorldSwitcher />);
