import {  useEffect, useRef, useState, Fragment } from 'react'
import Arc from './components/Arc'

export default function Home() {
  const colours = ["#F0E10C", "#9002A2", "#F9141F", "#58C4FF", "#1C9C35"]
  const players=[
    {
      name: "Alex J",
      short: "AJ"
    },
    {
      name: "Heera R",
      short: "HR"
    },
    {
      name: "Tee G",
      short: "TG"
    },
    {
      name: "Izzy H",
      short: "IH"
    },
    {
      name: "Ryan K",
      short: "RK"
    },
    {
      name: "Bade",
      short: "BA"
    },
    // {
    //   name: "Timmy P",
    //   short: "TP"
    // },
    // {
    //   name: "Erwann Barker",
    //   short: "EB"
    // },
    // {
    //   name: "Tommy R",
    //   short: "TR"
    // }
  ]

  const spinner = useRef<HTMLDivElement|null>(null)
  const spinnerListener = useRef(true)

  useEffect(()=>{
    const listener = () => {
      console.log("we are at the end of the transition")
    }
    if(spinner.current && spinnerListener) {
      spinner.current.addEventListener("transitionend", listener)
    }
    () => {
      if(spinner.current){
        console.log("removing listener")
        spinner.current.removeEventListener("transitionend", listener)
      }
    }
  }, [spinner])

  const initialDegrees = 0;
  const angle = 359.9999/players.length;

  const [degrees, setDegrees] = useState(initialDegrees);
  const [duration, setDuration] = useState(5);
  const play = () => {
    setDuration(5)
    setDegrees(3600*5 + (angle * 3))
  };
  const reset = () => {
    setDuration(0)
    setDegrees(initialDegrees)
  };

  return (
    <div className="container">
      <main className="main">
        <div className="wheelholder">
          <div className="wheelshadow"></div>
          <div className="wheelrim"></div>
          <div className="wheel">
            <div 
              className="rotating"
              ref={spinner}
              style={
                {
                  transform: `rotate(${degrees}deg)`,
                  transitionDuration: `${duration}s`
                }
              }>
                {players.map((player, idx)=> {
                const colourSelection = idx%colours.length;
                return (<Fragment key={idx}>
                  <div className="abs">
                    <Arc x={200} y={200} radius={200} degrees={angle} rotate={idx*angle} colour={colours[colourSelection]} />
                  </div>
                </Fragment>)
              })}
            </div>
            </div>
          </div>

        <div style={{display: "flex", justifyContent: "center", marginTop: "200px"}}>
          <button onClick={()=>play()}>PLAY</button>
          <button onClick={()=>reset()}>RESET</button>
        </div>
      </main>
    </div>
  )
}
