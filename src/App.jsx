import './App.css'
import Board from './Board'
import Line from './Line'
import useWordleGame from './hooks/useWordleGame'
import { EMPTY_GUESS, MAX_LETTER_LENGTH, MAX_FUTURE_ROWS_LENGTH } from './constants'

function App() {
  const { currentGuess, gameover, guesses, solution } = useWordleGame()
  const newGuesses = [...guesses]

  return (
    <section id="center">
      <h1>Wordle Demo</h1>
      {
        gameover ? <h2>GAME OVER <button onClick={() => window.location.reload()}>RESTART</button></h2> : ''
      }
      <Board>
        { // This section is for past guesses --------
          newGuesses.map(( guess, i ) => {
            const className = "tile"
            const tiles = []
            for(let i=0; i<guess.length; i++) {
              let stateName = ''
              let character = guess[i]
              if( character === solution[i]) {
                stateName = 'correct'
              } else if ( character === ' ' ) {
                stateName = 'unknown'
              } else if ( solution.indexOf(guess[i]) > -1 ) {
                stateName = 'in-word'
              } else {
                stateName = 'incorrect'
              }
              tiles.push(<div key={i} className={ `${className} ${stateName} past` }>{guess[i].toUpperCase()}</div>)
            }
            return <Line key={i}>{ tiles }</Line>
          })
        }
        { // This section is for the current guess ---------------------
          <Line key="current-guess">
            {
              (()=>{
                let x = 0
                let domArr = []
                if ( ! gameover ) {
                  while( x < MAX_LETTER_LENGTH ) {
                    let result = currentGuess[x++] || ' '
                    domArr.push(<div key={x} className="tile unknown current">{ result.toUpperCase() }</div>)
                  }
                }
                return domArr
              })()
            }
          </Line>
        }
        { // This section is for the future guesses -------
          (()=>{
            let i = gameover ? -1 : 0 // i needs to be set based on final result for UI number of rows
            const lines = []
            while( i < ( MAX_FUTURE_ROWS_LENGTH - newGuesses.length ) ) {
              lines.push(<Line key={i++}>
                {
                  (() => {
                    let j = 0
                    let domArr = []
                    while( j < MAX_LETTER_LENGTH ) {
                      domArr.push(<div key={j++} className="tile unknown past">{ ' ' }</div>)
                    }
                    return domArr
                  })()
                } 
              </Line>)
            }
            return lines
          })()
        }
      </Board>
    </section>
  )
}

export default App
