import { useReplicant } from "@nodecg/react-hooks";

export default function () {
  const [donationTotal] = useReplicant<{ amount: number; currency: string }>(
    "donationTotal",
    {
      bundle: "rpgsu-layouts",
    },
  );

  if (!donationTotal) {
    return { amount: 0, currency: "EUR" };
  }

  return donationTotal;
}
