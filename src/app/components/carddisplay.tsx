export default function CardDisplay({cards}:any) {
  return(
    <div>
      {cards.map((card:any) => <img key={card.code} src={card.images.png} />)}
    </div>
  )
}