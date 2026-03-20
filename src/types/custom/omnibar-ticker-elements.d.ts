export type GenericMessage = {
  type: "generic-message";
  message: string;
};

export type NextRun = {
  type: "next-run";
};

export type OmnibarTickerElement = { id: string } & (
  | GenericMessage
  | NextRun
) & {
    timeout: number;
  };
