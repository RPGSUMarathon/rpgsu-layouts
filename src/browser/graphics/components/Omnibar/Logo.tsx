import Logo from "../../img/offline2026/offline26_logo.png";

export const OmnibarLogo = ({ className }: { className?: string }) => {
  return (
    <div id="omnibar-logo" className={`h-full ${className}`}>
      <img src={Logo} className="h-full" />
    </div>
  );
};
