type GenericMessage = {
  type: "generic-message";
  message: string;
};

type NextRun = {
  type: "next-run";
};

export type OmnibarTickerElements = (GenericMessage | NextRun) & {
  timeout: number;
};
