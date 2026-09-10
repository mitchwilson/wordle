import { useEffect, useState } from 'react'

const MAX_LETTER_LENGTH = 5
const URL = '/words.json'

function useWordleGame() {
  const [guesses, setGuesses] = useState([])
  const [solution, setSolution] = useState('')
  const [currentGuess, setCurrentGuess] = useState('')

  useEffect(() => {
    const fetchRandomSolution = async () => {
      const response = await fetch(URL)
      const words = await response.json()
      const randomWord = words[Math.floor(Math.random() *  words.length)]
      setSolution(randomWord)
    }

    fetchRandomSolution()
  }, [])

  useEffect(() => {
    const handleKeydown = (event) => {
      const key = event.key

      if (key === 'Enter') {
        if (currentGuess.length === MAX_LETTER_LENGTH) {
          setGuesses(prevItems => [...prevItems, currentGuess])
          setCurrentGuess('') 
          return
        }
      }

      // Delete last character of current guess when the Backspace or Delete key is pressed
      if (key === 'Backspace') {
        if (currentGuess.length > 0) {
          setCurrentGuess(str => str.slice(0, str.length-1))
        }
        return
      }

      // Do not allow non-alphabet characters
      if (!/^[a-zA-Z]$/.test(key)) {
        return
      }

      // Limit guess character length to MAX length allowed
      if (currentGuess.length === MAX_LETTER_LENGTH) {
        return
      }

      setCurrentGuess(str => str + key)
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [guesses, currentGuess])

  return {
    currentGuess,
    guesses,
    solution,
  }
}

export default useWordleGame
