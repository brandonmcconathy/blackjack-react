export default function compareScores(dealer: number, player: number) {
  if (dealer > 21 || player > dealer) {
    return('win')
  } else if (dealer > player) {
    return('lose')
  } else {
    return('push')
  }
}