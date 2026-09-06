import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Board from './Board';



function App() {
  // Constansts
  const EMPTY_GUESS = ' '
  const MAX_LETTER_LENGTH = 5
  const MAX_ROWS_LENGTH = 6
  const URL = '/words.json'
  const createEmptyRow = () => Array(MAX_LETTER_LENGTH).fill(EMPTY_GUESS)
  const createEmptyBoard = () =>
    Array.from({ length: MAX_ROWS_LENGTH }, () => createEmptyRow())
  // Local states
  const [guesses, setGuesses] = useState(createEmptyBoard)
  const [solution, setSolution] = useState('')
  const [currentRowIndex, setCurrentRowIndex] = useState(0)
  const [currentCellIndex, setCurrentCellIndex] = useState(0)

  useEffect(()=>{
    const fetchRandomSolution = async () => {
      const response = await fetch(URL)
      const words = await response.json()
      const randomWord = words[Math.floor(Math.random() * words.length)]
      setSolution(randomWord)
    }
 
    fetchRandomSolution()
    
  }, [])

  useEffect(() => {
    const updateBoard = () => {

    }

    updateBoard()
  })

  useEffect(() => {
    const handleKeydown = (event) => {
      const key = event.key

      if (key === 'Enter') {
        setCurrentRowIndex(i => i + 1)
        setCurrentCellIndex(0)
      }

      // Allow user to delete the most recent letter
      if (key === 'Backspace') {

        if(currentCellIndex === 0 && currentRowIndex === 0 ) {
          return
        }

        setGuesses( guesses => {
          const newGuesses = [ ...guesses ]
          newGuesses[currentRowIndex] = [...newGuesses[currentRowIndex]]
          newGuesses[currentRowIndex][currentCellIndex - 1] = EMPTY_GUESS
          return newGuesses
        }) 

        setCurrentCellIndex(i => i - 1)
      }

      // Skip non-alphabet characters such as numbers and punctuation
      if (!/^[a-zA-Z]$/.test(key)) {
        return
      }

      setGuesses( guesses => {
        if (currentCellIndex >= MAX_LETTER_LENGTH) {
          return guesses
        }

        const newGuesses = [ ...guesses ]
        newGuesses[currentRowIndex] = [...newGuesses[currentRowIndex]]
        newGuesses[currentRowIndex][currentCellIndex] = key.toLowerCase()

        return newGuesses
      })

      setCurrentCellIndex(i => Math.min(i + 1, MAX_LETTER_LENGTH))
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [currentCellIndex, currentRowIndex])


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
