import './App.css'
import Board from './Board'
import useWordleGame from './hooks/useWordleGame'

function App() {
  const { guesses, solution } = useWordleGame()


  return (
    <>
      <section id="center">
        { solution }
        <Board model={ guesses } />
      </section>
    </>
  )
}

export default App
