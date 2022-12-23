import React, {ChangeEvent, useCallback} from "react";

const Ranger: React.FC<Props> = ({
  num,
  property,
  changeProperty,
  min,
  max
}) => {

  const sliderValueChanged = useCallback((val:string) => {
    changeProperty(property, parseInt(val, 10));
  },[changeProperty, property]);

  const initialValue = num ? num : 1;
  return (
    <input
      type="range"
      disabled={!num}
      value={initialValue}
      max={max}
      min={min}
      onChange={(e: ChangeEvent<HTMLInputElement>) => sliderValueChanged(e.target.value)}
      />
  )
}

type Props = {
  min: number
  max: number
  num: number | null
  property: string
  changeProperty: (property: string, num: number) => void
}

export default Ranger;
