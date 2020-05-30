const fs = require('fs')
const camelCase = require('camelcase')
const colorNameList = require('color-name-list')

/**
 * 実行の度に処理するのは無駄なので事前にcolors.jsonに出力しておく
 * FIXME: 面倒いのでjsで作成する
 */
const exportColorsJson = () => {
  const colors = colorNameList.reduce((obj, { name, hex }) => {
    // objectのkeyに使いたいのでキャメルケースに変換する
    // FIXME: 英語以外の文字が含まれているケースがある
    // FIXME: 数字から始まるケースがある
    // FIXME: 記号が含まれるケースがある
    const key = camelCase(name)
    return Object.assign(obj, { [key]: hex })
  }, {})

  fs.writeFile('./src/colors.json', JSON.stringify(colors), {}, () => {})
}

exportColorsJson()
