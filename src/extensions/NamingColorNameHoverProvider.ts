import * as vscode from 'vscode'
const rgbHex = require('rgb2hex')

import { extractColor } from '../color/extract'
import { namingMatchName, namingNearestName } from '../color/naming'

type NamedColor = {
  origin: string
  match: string
  nearest: string
}

const createMessage = (namedColor: NamedColor) => {
  const name =
    namedColor.match === namedColor.nearest
      ? namedColor.match
      : [namedColor.match, namedColor.nearest]
          .filter((n) => n !== '')
          .join(', ')
  return `[naming color] ${namedColor.origin}: ${name}`
}

const createMarkdownStrings = (namedColors: NamedColor[]) =>
  namedColors.map((n) => {
    const ms = new vscode.MarkdownString(createMessage(n))
    ms.isTrusted = true
    return ms
  })

export class NamingColorNameHoverProvider implements vscode.HoverProvider {
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

    const namedColors: NamedColor[] = colors.map((origin) => {
      const hex = rgbHex(origin).hex
      const match = namingMatchName(hex)
      const nearest = namingNearestName(hex)
      return { origin, match, nearest }
    })

    return new vscode.Hover(createMarkdownStrings(namedColors))
  }

  public dispose() {}
}
