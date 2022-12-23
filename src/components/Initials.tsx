export const Initials: React.FC<Props> = ({ degrees, rotate, colour, text }) => {
  return (
    <span className="initials" style={{
        transform:`rotate(${rotate + (degrees/2)}deg)`,
        color: `${colour}`
    }}>{text}</span>
)};


// maybe put back in radius for height
type Props = {
  degrees: number
  rotate: number
  colour: string
  text: string
}

export default Initials;
