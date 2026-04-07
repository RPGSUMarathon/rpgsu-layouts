import { useReplicant } from "@nodecg/react-hooks";
import { AutoTextSize } from "auto-text-size";
import { type NowPlaying } from "foobar2000-controller/src/types/nowPlaying";

export const MusicPlayerContainer = () => {
  const [player] = useReplicant<NowPlaying>("nowPlaying", {
    bundle: "nodecg-foobar2000-controller",
  });

  return (
    <div className="h-full w-117 text-center place-content-center ">
      <div className="w-full h-1.5 bg-[#5775a4]" />
      <div className="bg-[#141c2f] py-1">
        <span
          className="text-3xl font-bold"
          style={{ textShadow: "0px 0px 5px #08DFF7" }}
        >
          Now Playing
        </span>
      </div>
      <div className="bg-[#3f4d67] h-12.5 px-2 w-full font-bold auto-text-size-override">
        <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={28}>
          {player && player.album}
        </AutoTextSize>
      </div>
      <div className="bg-[#141c2f] h-12.5 px-2 w-full font-bold auto-text-size-override">
        <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={26}>
          {player && player.title}
        </AutoTextSize>
      </div>
      <div className="w-full h-1.5 bg-[#5775a4]" />
    </div>
  );
};