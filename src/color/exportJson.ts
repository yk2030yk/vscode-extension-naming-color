// @ts-ignore
const fs = require('fs')
// @ts-ignore
const camelCase = require('camelcase')
// @ts-ignore
const colorNameList = require('color-name-list')

/**
 * 実行の度に処理するのは無駄なので事前に出力colors.jsonに出力しておく
 */
export const exportColorsJson = () => {
  const colors = colorNameList.reduce((obj: any, { name, hex }: any) => {
    const key = camelCase(name)
    return Object.assign(obj, { [key]: hex })
  }, {}) as any

  fs.writeFile('./src/color/colors.json', JSON.stringify(colors), {}, () => {})
}

exportColorsJson()
