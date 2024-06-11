import Bulb from "./Bulb"

const Lighting = ({numberOfBulbs}:Props) => {
  return <div style={{position: "relative", width:"400px", height: "400px"}}>
    {
      [...Array(numberOfBulbs)].map((_,i) => <div 
      key={i} 
      style={{transform: `rotate(${i*12.5}deg)`}}
      className="bulbholder">
      <Bulb name={i%2 === 1 ? "" : ""} style={{animationDelay: `${i*0.1}s`}} />
    </div>)
    }
  </div>
};

type Props = {
  numberOfBulbs: number
}


export default Lighting;