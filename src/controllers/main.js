//

exports.routeMain = (req, res) => {
  res.send('ok!')
}

exports.routeSpin = (req, res) => {
  
  const BASE = 36;
  const bet = req.body.numbers.reduce((memo, item) => memo += item.value, 0);
  
  const numberSpin = (Math.random() * 36).toFixed(0);

  const validNumbers = req.body.numbers.filter(number => number.value > 0)

  const win = validNumbers.some(elem => elem.number == numberSpin)
  console.log(BASE, validNumbers.length, bet)
  const winAmount = win ? BASE / validNumbers.length * bet : 0

  res.send({
    bet,
    win,
    winAmount: win ? parseInt(winAmount.toFixed(0)) - bet : 0,
    spin: numberSpin
  })

}