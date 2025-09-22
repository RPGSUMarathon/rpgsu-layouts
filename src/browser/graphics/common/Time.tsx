
type Props = {
  utcTimeString: string;
};

/**
 * React component example using the TimeHelper
 */
export const TimeDisplay = ({ utcTimeString} : Props) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}> 
    {utcTimeString}
    </div>
  );
};