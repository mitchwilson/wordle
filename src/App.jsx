import './App.css'
import Board from './Board'
import Line from './Line'
import useWordleGame from './hooks/useWordleGame'

function App() {
  const { currentGuess, guesses, solution } = useWordleGame()
  const EMPTY_GUESS = '     '
  const newGuesses = [...guesses]

  while(newGuesses.length < 6) {
      newGuesses.push(EMPTY_GUESS)
  }

  return (
    <section id="center">
      <div>{ `Solution: ${solution.toUpperCase()}` }</div>
      <div>{ `Current Guess: ${currentGuess}` }</div>
      <Board>
        {
          newGuesses.map(( guess, i ) => {
            const tiles = []
            for(let i=0; i<guess.length; i++) {
              tiles.push(<div key={i} className="tile">{guess[i]}</div>)
            }
            return <Line key={i}>{ tiles }</Line>
          })
          }
      </Board>
    </section>
  )
}

export default App
