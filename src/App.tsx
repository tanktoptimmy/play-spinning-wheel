import {  useEffect, useRef, useState, Fragment, useCallback } from 'react'
import Arc from './components/Arc'
import Ranger from './components/Ranger'

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
    {
      name: "Timmy P",
      short: "TP"
    },
    {
      name: "Erwann Barker",
      short: "EB"
    },
    {
      name: "Tommy R",
      short: "TR"
    }
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

  const [degrees, setDegrees] = useState(initialDegrees);
  const [duration, setDuration] = useState(5);
  const [selectedNumber, setSelectedNumber] = useState(0)
  const [currentPlayState, setCurrentPlayState] = useState({
    numberOfPlayers: 5,
    numberOfBulbs: 29
  })
  const play = () => {
    setDuration(5)
    setDegrees(3600*5 + (angle * selectedNumber) - (angle/2))
  };
  const reset = () => {
    setDuration(0)
    setDegrees(initialDegrees)
  };


  const changeProperty = useCallback((property: string, num: number) => {
    setCurrentPlayState({
      ...currentPlayState,
      [property]: num
    })
  },[setCurrentPlayState, currentPlayState])
  const angle = 359.9999/currentPlayState.numberOfPlayers
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
                {players.slice(0,currentPlayState.numberOfPlayers).map((player, idx)=> {
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
          <div style={{ marginInline: "12px" }}>
            <div>Number of Players:</div>
            <Ranger max={players.length} min={1} property="numberOfPlayers" changeProperty={changeProperty} num={currentPlayState.numberOfPlayers}/>
          </div>
          <div style={{ marginInline: "12px" }}>
            <div>Number of Bulbs:</div>
            <Ranger max={1200} min={1} property="numberOfBulbs" changeProperty={changeProperty} num={currentPlayState.numberOfBulbs}/>
          </div>
          <div>
            <button onClick={()=>play()}>PLAY</button>
            <button onClick={()=>reset()}>RESET</button>
          </div>
        </div>
      </main>
    </div>
  )
}
