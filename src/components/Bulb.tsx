import { CSSProperties } from 'react';

const Bulb = ({style}:Props) => {
  const attribs ={
    style
  }
  return <div className="bulb" {...attribs} />
};

type Props = {
  style?: CSSProperties | undefined
}
export default Bulb;