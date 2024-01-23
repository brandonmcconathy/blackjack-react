export default function CardDisplay({cards}:any) {
  return(
    <div>
      {cards.map((card:any) => <h1>{card}</h1>)}
    </div>
  )
}