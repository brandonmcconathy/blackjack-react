export default function updateScore(value:string, currCount:number, currAces:number) {
    console.log('here')

    let newCount = 0

    if (value == 'KING' || value == 'QUEEN' || value == 'JACK') {
        return(10)
    } else if (value == 'ACE') {
        if ((currCount + 11) > 21) {
        return(1)
        }
        return(11)
    } else {
        return(Number(value))
    }
}