export type GenericMessage = {
  type: "generic-message";
  message: string;
};

export type NextRun = {
  type: "next-run";
};

export type Incentive = {
  type: "incentive";
};

export type OmnibarTickerElement = { id: string } & (
  | GenericMessage
  | NextRun
  | Incentive
) & {
    timeout: number;
    hideOnCountdown: boolean;
    hideOnIntermission: boolean;
  };
