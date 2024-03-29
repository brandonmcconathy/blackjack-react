export default function CardDisplay({cards}:any) {
  return(
    <div className="flex justify-center items-center h-1/4">
      {cards.map((card:any) => {
        if (card.down) {
          return(<img key={card.code} src='./card-back.png' className="w-32 -mx-12" />)
        } else {
          return(<img key={card.code} src={card.images.png} className="w-32 -mx-12" />)
        }
      })}
    </div>
  )
}