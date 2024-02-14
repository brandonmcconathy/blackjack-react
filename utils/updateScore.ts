export default function updateScore(cards:any[]) {

    let total = 0
    let fullAces = 0
    console.log(cards)

    cards.map((card:any) => {
        if (card.value == 'KING' || card.value == 'QUEEN' || card.value == 'JACK') {
            total += 10
        } else if (card.value == 'ACE') {
            total += 11
            fullAces++
        } else {
            total += Number(card.value)
        }
    })

    while (total > 21 && fullAces > 0) {
        total -= 10
        fullAces--
    }

    return(total)
}