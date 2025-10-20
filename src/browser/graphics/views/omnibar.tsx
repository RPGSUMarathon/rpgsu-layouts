import { render } from '../../render';

type Props = {
    className?: string,
}

export const Omnibar = ({ className }: Props) => {

  return (
      <div className={`w-full h-[60px] ${className}`} style={{boxShadow: "0px -2px 2px rgba(0,0,0,0.1)"}}>

        </div>
  );
};

render(<Omnibar />);
