//

import numbers from '../models/numbers.json'

exports.routeGetNumbers = (req, res) => {
  res.send(numbers)
}