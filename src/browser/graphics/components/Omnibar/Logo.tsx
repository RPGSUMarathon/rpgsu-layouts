import Logo from "../../img/base-long-online-logo.png";

export const OmnibarLogo = ({ className }: { className?: string }) => {
  return (
    <div id="omnibar-logo" className={`h-full ${className}`}>
      <img src={Logo} className="h-full" />
    </div>
  );
};
