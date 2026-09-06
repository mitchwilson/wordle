import Line from './Line'

function Board( { model } ) {
    return (
        <div className="board">
            {
                model.map(( guess, i ) => {
                    return <Line key={i} guess={guess} />
                })
            }
        </div>
    )
}

export default Board;