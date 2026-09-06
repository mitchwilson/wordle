function Line( { guess } ) {
  const tiles = []

  for(let i=0; i<guess.length; i++) {
    tiles.push(<div key={i} className="tile">{guess[i]}</div>)
  }
  return (
    <div className="line">{tiles}</div>
  )
}

export default Line