import './App.css'
import Board from './Board'
import useWordleGame from './hooks/useWordleGame'

function App() {
  const { currentGuess, guesses, solution } = useWordleGame()

  return (
    <>
      <section id="center">
        <div>{ solution }</div>
        <div>{ currentGuess }</div>
        <Board guesses={ [...guesses] } />
      </section>
    </>
  )
}

export default App
