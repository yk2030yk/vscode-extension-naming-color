const nearestColors = require('nearest-color')
const colorsJson = require('./colors.json')

export const namingMatchName = (targetHex: string) => {
  const key = Object.keys(colorsJson).find(
    (key: string) => colorsJson[key] === targetHex
  )
  return key ? key : ''
}

export const namingNearestName = (targetHex: string) => {
  const nearest = nearestColors.from(colorsJson)
  const nearestName = nearest(targetHex)
  return nearestName ? nearestName.name : ''
}
