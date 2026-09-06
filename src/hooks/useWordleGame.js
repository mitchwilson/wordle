import { useEffect, useState } from 'react'

const EMPTY_GUESS = ' '
const MAX_LETTER_LENGTH = 5
const MAX_ROWS_LENGTH = 6
const URL = '/words.json'

const createEmptyRow = () => Array(MAX_LETTER_LENGTH).fill(EMPTY_GUESS)
const createEmptyBoard = () =>
  Array.from({ length: MAX_ROWS_LENGTH }, () => createEmptyRow())

function useWordleGame() {
  const [guesses, setGuesses] = useState(createEmptyBoard)
  const [solution, setSolution] = useState('')
  const [currentRowIndex, setCurrentRowIndex] = useState(0)
  const [currentCellIndex, setCurrentCellIndex] = useState(0)

  useEffect(() => {
    const fetchRandomSolution = async () => {
      const response = await fetch(URL)
      const words = await response.json()
      const randomWord = words[Math.floor(Math.random() * words.length)]
      setSolution(randomWord)
    }

    fetchRandomSolution()
  }, [])

  useEffect(() => {
    const handleKeydown = (event) => {
      const key = event.key

      if (key === 'Enter') {
        if (currentCellIndex === MAX_LETTER_LENGTH && currentRowIndex < MAX_ROWS_LENGTH - 1) {
          setCurrentRowIndex((row) => row + 1)
          setCurrentCellIndex(0)
        }
        return
      }

      if (key === 'Backspace') {
        if (currentCellIndex === 0) {
          return
        }

        setGuesses((prevGuesses) => {
          const nextGuesses = [...prevGuesses]
          nextGuesses[currentRowIndex] = [...nextGuesses[currentRowIndex]]
          nextGuesses[currentRowIndex][currentCellIndex - 1] = EMPTY_GUESS
          return nextGuesses
        })

        setCurrentCellIndex((cell) => cell - 1)
        return
      }

      if (!/^[a-zA-Z]$/.test(key)) {
        return
      }

      if (currentRowIndex >= MAX_ROWS_LENGTH || currentCellIndex >= MAX_LETTER_LENGTH) {
        return
      }

      setGuesses((prevGuesses) => {
        const nextGuesses = [...prevGuesses]
        nextGuesses[currentRowIndex] = [...nextGuesses[currentRowIndex]]
        nextGuesses[currentRowIndex][currentCellIndex] = key.toLowerCase()
        return nextGuesses
      })

      setCurrentCellIndex((cell) => Math.min(cell + 1, MAX_LETTER_LENGTH))
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [currentCellIndex, currentRowIndex])

  return {
    guesses,
    solution,
    currentRowIndex,
    currentCellIndex,
  }
}

export default useWordleGame
