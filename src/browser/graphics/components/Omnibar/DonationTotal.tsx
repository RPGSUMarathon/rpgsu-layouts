import { animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import useDonationTotal from "../../../hooks/useDonationTotal";

const formatAmount = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toFixed(0)} ${currency}`;
  }
};

export const OmnibarDonationTotal = ({ className }: { className?: string }) => {
  const donationTotal = useDonationTotal();
  const animatedAmountRef = useRef(donationTotal.amount);
  const [animatedAmount, setAnimatedAmount] = useState(donationTotal.amount);

  useEffect(() => {
    const animation = animate(animatedAmountRef.current, donationTotal.amount, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (amount) => {
        animatedAmountRef.current = amount;
        setAnimatedAmount(amount);
      },
    });

    return () => animation.stop();
  }, [donationTotal.amount]);

  const formattedTotal = formatAmount(animatedAmount, donationTotal.currency);

  return (
    <div
      id="omnibar-donation-total"
      className={`flex h-full items-center gap-2 px-4 font-bold ${className ?? ""}`}
    >
      <span className="flex-1 overflow-hidden text-right text-2xl">
        {formattedTotal}
      </span>
    </div>
  );
};
