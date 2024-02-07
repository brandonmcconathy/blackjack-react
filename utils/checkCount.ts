export default function checkCount(cards:any[]) {
  
  let count = 0
  console.log('here')

  cards.forEach((card:any) => {
    console.log(card)
    count += Number(card.value)
  })
  
  return(count)
}