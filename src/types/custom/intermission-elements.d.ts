export type RunPropsContainer = {
  index: number;
  runData: RunData;
};

export type DonationProps = {
  name: string;
  amount: number;
  currency: string;
  message?: string;
};