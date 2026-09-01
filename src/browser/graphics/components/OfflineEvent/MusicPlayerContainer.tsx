import { useReplicant } from "@nodecg/react-hooks";
import { AutoTextSize } from "auto-text-size";
import { type NowPlaying } from "foobar2000-controller/src/types/nowPlaying";

export const MusicPlayerContainer = () => {
  const [player] = useReplicant<NowPlaying>("nowPlaying", {
    bundle: "nodecg-foobar2000-controller",
  });

  return (
    <div className="h-[200px] w-full text-center place-content-center flex flex-col flex-auto box2 ">
      {/* Header */}
      <div className="ridge-inner bg-(--color-bs-music-dark)">
        <div className="text-3xl font-bold py-2">Now Playing</div>
      </div>

      {/* Album */}
      <div className="px-2 w-full font-bold  auto-text-size-override grow ridge-inner bg-(--color-bs-music)">
        <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={28}>
          {player && player.album}
        </AutoTextSize>
      </div>

      {/* Title */}
      <div className=" px-2 w-full font-bold auto-text-size-override grow ridge-inner bg-(--color-bs-music-dark)">
        <AutoTextSize mode="oneline" minFontSizePx={18} maxFontSizePx={26}>
          {player && player.title}
        </AutoTextSize>
      </div>
    </div>
  );
};
