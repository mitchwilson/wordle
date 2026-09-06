import Line from './Line'

function Board( { model } ) {
    return (
        <div className="board">
            {
                model.map(( guess, i ) => {
                    console.log(guess, i)
                    return <Line key={Math.random()} guess={guess} />
                })
            }
        </div>
    )
}

export default Board;