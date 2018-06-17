const checkForWaterCollisions = params => {
  let { x, y } = params
  if (x < 360) params.x = 360
  if (x > 3230) params.x = 3230

  if (y < 390) params.y = 390
  if (y > 2580) params.y = 2580
}

const checkForPlayersCollisions = params => {
  let { x, y, opponents } = params
  opponents.forEach(opp => {
    if (x < opp.x + 50 && x > opp.x - 50 && y < opp.y + 50 && y > opp.y - 50) {
      if (x < opp.x + 50 && x > opp.x + 40) params.x = opp.x + 50
      if (x > opp.x - 50 && x < opp.x - 40) params.x = opp.x - 50
      if (y < opp.y + 50 && y > opp.y + 40) params.y = opp.y + 50
      if (y > opp.y - 50 && y < opp.y - 40) params.y = opp.y - 50
    }
  })
}

const checkForCollisions = (params, disp) => {
  checkForWaterCollisions(params)
  checkForPlayersCollisions(params)
  disp(params.x, params.y, params.dir)
}

export { checkForCollisions }
