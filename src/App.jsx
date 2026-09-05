import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

const MAX_LETTER_LENGTH = 5

function App() {
  const [word, setWord] = useState('')
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const URL = '/words.json'

  useEffect(() => {
    const handleKeydown = (event) => {
      const key = event.key

      if (key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1))
        return
      }

      if (!/^[a-zA-Z]$/.test(key)) {
        return
      }

      setCurrentGuess((prev)=> {
        if(prev.length < MAX_LETTER_LENGTH) {
          return prev + key.toLowerCase()
        }

        return prev
      })
    }
    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [])

  useEffect(()=>{
    const doFetch = async () => {
      const response = await fetch(URL)
      const words = await response.json()
      const randomWord = words[Math.floor(Math.random() * words.length)]
      setWord(randomWord)
    }
 
    doFetch();
    
  }, [])

  return (
    <>
      <section id="center">
        {
          guesses.map(guess => {
            return <Line key={Math.random()} guess={word} />
          })
        }
      </section>
    </>
  )
}

const Line = ( {guess} ) => {
  const tiles = []

  for(let i=0; i<MAX_LETTER_LENGTH; i++) {
    tiles.push(<div key={i} className="tile">{guess[i]}</div>)
  }
  return (
    <div key={guess} className="line">{tiles}</div>
  )
}

export default App
