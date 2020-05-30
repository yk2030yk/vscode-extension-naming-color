import * as vscode from 'vscode'

import { NamingColorNameHoverProvider } from './extensions/NamingColorNameHoverProvider'
import { Colors } from './types'

export const activate = (context: vscode.ExtensionContext) => {
  // FIXME: 独自定義の色設定を取得したい
  const extendsColors: Colors =
    vscode.workspace.getConfiguration('namingColors') || {}

  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { scheme: 'file' },
      new NamingColorNameHoverProvider({})
    )
  )
}

export function deactivate() {}
