import { useEffect } from "react";

export const OmnibarGenericMessage = ({
  message,
  className,
  timeout,
  onEnd,
}: {
  className?: string;
  message: string;
  onEnd: () => void;
  timeout: number;
}) => {
  useEffect(() => {
    console.log("GenericMessage: Mounted");

    const endTimeout = setTimeout(() => {
      console.log("GenericMessage: End");
      onEnd();
    }, timeout);

    return () => clearTimeout(endTimeout);
  }, [onEnd, timeout]);

  return (
    <div
      id="generic-message"
      className={`text-4xl h-full text-center ${className}`}
      dangerouslySetInnerHTML={{ __html: message }}
    />
  );
};
