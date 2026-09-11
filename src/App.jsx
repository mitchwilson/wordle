import './App.css'
import Board from './Board'
import Line from './Line'
import useWordleGame from './hooks/useWordleGame'
import { EMPTY_GUESS } from './constants'

function App() {
  const { currentGuess, guesses, solution } = useWordleGame()
  const newGuesses = [...guesses]

  while(newGuesses.length < 6) {
      newGuesses.push(EMPTY_GUESS)
  }

  return (
    <section id="center">
      <div>{ `Solution: ${solution.toUpperCase()}` }</div>
      <div>{ `Current Guess: ${currentGuess.toUpperCase()}` }</div>
      <Board>
        {
          newGuesses.map(( guess, i ) => {
            const className = "tile"
            const tiles = []
            for(let i=0; i<guess.length; i++) {
              let stateName = ''
              let character = guess[i]
              if( guess[i] === solution[i]) {
                stateName = 'correct'
              } else if (guess === EMPTY_GUESS) {
                stateName = 'unknown'
              } else if ( solution.indexOf(guess[i]) > -1 ) {
                stateName = 'in-word'
              } else {
                stateName = 'incorrect'
              }
              tiles.push(<div key={i} className={ `${className} ${stateName}` }>{guess[i].toUpperCase()}</div>)
            }
            return <Line key={i}>{ tiles }</Line>
          })
          }
      </Board>
    </section>
  )
}

export default App
