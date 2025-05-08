import {  useEffect, useRef, useState, Fragment, useCallback, FormEvent } from 'react'
import Arc from './components/Arc'
import Ranger from './components/Ranger'
import Lighting from './components/Lighting'
import Initials from './components/Initials'
import Star from './components/Star'
import ArrowDown from './components/ArrowDown'

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
    },
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
    },
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
  const SPIN_DURATION = 7.5

  const [degrees, setDegrees] = useState(initialDegrees);
  const [duration, setDuration] = useState(SPIN_DURATION);
  const [currentPlayState, setCurrentPlayState] = useState({
    numberOfPlayers: 5,
    numberOfBulbs: 87,
    selectedWinner: 0,
    spinDuration: 5
  })

  const { numberOfPlayers, numberOfBulbs, selectedWinner, spinDuration } = currentPlayState;

  const play = () => {
    setDuration(spinDuration)
    setDegrees(3600*5 - (angle * selectedWinner) - (angle/2));
    alert(players[selectedWinner].name)
    window.parent.postMessage({ type: 'SPIN_STARTED', winner: players[selectedWinner].name }, '*');
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

  const angle = 359.9999/numberOfPlayers
  return (
    <div className="container">
      <main className="main">
        <div className="wheelholder">
          <div className="wheelshadow"></div>
          <div className="wheelrim"></div>
          <div className="wheelbulbs">
            <Lighting numberOfBulbs={numberOfBulbs}/>
          </div>
          <div className="arrowDown abs" style={{zIndex: "400", top: -20}}>
            <ArrowDown/>
          </div>
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
                {players.slice(0,numberOfPlayers).map((player, idx)=> {
                const colourSelection = idx%colours.length;
                return (<Fragment key={idx}>
                  <div className="abs">
                    <Arc x={200} y={200} radius={200} degrees={angle} rotate={idx*angle} colour={colours[colourSelection]} />
                  </div>
                  <div className="abs">
                    <Initials degrees={angle} rotate={idx*angle} colour="white" text={player.short} />
                  </div>
                </Fragment>)
              })}
            </div>
          </div>


          <div style={{
              position: "absolute",
              height: "80px",
              width: "80px",
              backgroundColor: "black",
              top: "160px",
              borderRadius: "100px",
              boxShadow:"0px 0px 20px black",
              zIndex: 500,
              transform: `rotate(${degrees}deg)`,
              transitionDuration: `${duration+1}s`
            }}>
              <div className="abs" style={{top: "12px", left: "12px", height: "50px", width: "50px"}}>
                <Star colour="red"/>
              </div>
              <div className="abs" style={{top: "15px", left: "15px", height: "50px", width: "50px"}}>
                <Star colour="#FFEE00"/>
              </div>
            </div>


        </div>

        <section style={{display: "flex",  marginTop: "100px",}}>
          <div style={{display: "flex", flex: "0 0 50%", justifyContent: "center", flexDirection: "column", background: "rgba(0,0,0,0.5)", padding: "12px"}}>
            <div style={{ margin: "12px", display: "flex"}}>
              <div style={{flex: "50%"}}>
                <div>Number of Players:</div>
                <Ranger max={players.length} min={1} property="numberOfPlayers" changeProperty={changeProperty} num={numberOfPlayers}/>
              </div>
              <div style={{flex: "50%", justifyContent: "center", textAlign: "center"}}>
                <div className="numberHolder">{numberOfPlayers}</div>
              </div>
            </div>
            <div style={{ margin: "12px", display: "flex"}}>
            <div style={{flex: "50%"}}>
                <div>Number of Bulbs:</div>
                <Ranger max={1200} min={1} property="numberOfBulbs" changeProperty={changeProperty} num={numberOfBulbs}/>
              </div>
              <div style={{flex: "50%", justifyContent: "center", textAlign: "center"}}>
                <div className="numberHolder">{numberOfBulbs}</div>
              </div>
            </div>
            <div style={{ margin: "12px", display: "flex" }}>
            <div style={{flex: "50%"}}>
                <div>Spin Duration:</div>
                <Ranger max={20} min={1} property="spinDuration" changeProperty={changeProperty} num={spinDuration}/>
              </div>
              <div style={{flex: "50%", justifyContent: "center", textAlign: "center"}}>
                <span className="numberHolder">{spinDuration}</span>
              </div>
            </div>
          </div>

        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: "50%",  background: "rgba(0,0,0,0.25)", borderLeft: "1px solid rgba(255,255,255,0.5" }}>
          <div style={{margin: "12px"}}>
            <select value={selectedWinner} onChange={(e: FormEvent<HTMLSelectElement>) => changeProperty('selectedWinner', parseInt(e.currentTarget.value))}>
              {players.slice(0,numberOfPlayers).map((player, idx) =>
                  <option key={`${player.short}-${idx}`} value={idx}>{player.name}</option>
              )}
            </select>
          </div>
          <div>
            <button style={{margin: "12px"}} onClick={()=>play()}>PLAY</button>
            <button style={{margin: "12px"}} onClick={()=>reset()}>RESET</button>
          </div>
        </div>
        </section>
      </main>
    </div>
  )
}
