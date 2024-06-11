import { CSSProperties } from 'react';

const Bulb = ({style, name=""}:Props) => {
  const attribs ={
    style
  }
  return <div className={`bulb bulb${name}`} {...attribs} />
};

type Props = {
  style?: CSSProperties | undefined;
  name: string;
}
export default Bulb;