import Line from './Line'

function Board( { guesses } ) {
    const EMPTY_GUESS = '     '
    while(guesses.length < 6) {
        guesses.push(EMPTY_GUESS)
    }
    return (
        <div className="board">
            {
                guesses.map(( guess, i ) => {
                    console.log(guess)
                    return <Line key={i} guess={guess} />
                })
            }
        </div>
    )
}

export default Board;