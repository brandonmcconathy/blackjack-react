export default function CardDisplay({cards}:any) {
  return(
    <div className="flex justify-center items-center">
      {cards.map((card:any) => <img key={card.code} src={card.images.png} className="w-32" />)}
    </div>
  )
}