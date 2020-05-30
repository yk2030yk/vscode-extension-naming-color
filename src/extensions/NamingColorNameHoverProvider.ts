import * as vscode from 'vscode'

import { extractColor } from '../color/extract'
import { ColorNamer } from '../color/naming'
import { Colors, NamedColor } from '../types'

/**
 * 定義済みのjsonファイルと独自定義した定義をマージする
 */
const colorsJson = require('../colors.json') as Colors
const mergeColors = (extendsColors: Colors) =>
  ({
    ...colorsJson,
    ...extendsColors,
  } as Colors)

/**
 * ホバーに出力するメッセージ
 */
const createMessage = (namedColor: NamedColor) => {
  const name =
    namedColor.match === namedColor.nearest
      ? namedColor.match
      : [namedColor.match, namedColor.nearest]
          .filter((n) => n !== '')
          .join(', ')
  return `[naming color] ${namedColor.origin}: ${name}`
}

/**
 * メッセージをMarkdownStringの配列に変換する
 */
const createMarkdownStrings = (namedColors: NamedColor[]) =>
  namedColors.map((n) => {
    const ms = new vscode.MarkdownString(createMessage(n))
    ms.isTrusted = true
    return ms
  })

export class NamingColorNameHoverProvider implements vscode.HoverProvider {
  private colors: Colors

  constructor(extendsColors: Colors = {}) {
    this.colors = mergeColors(extendsColors)
  }

  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken
  ): vscode.Hover | null {
    const line = document.lineAt(position)
    const colors = extractColor(line.text)

    if (colors.length === 0) {
      return null
    }

    const namedColors: NamedColor[] = colors.map((color) => {
      const colorNamer = new ColorNamer(color, this.colors)
      return {
        origin: colorNamer.origin,
        match: colorNamer.matchName,
        nearest: colorNamer.nearestName,
      }
    })

    return new vscode.Hover(createMarkdownStrings(namedColors))
  }

  public dispose() {}
}
