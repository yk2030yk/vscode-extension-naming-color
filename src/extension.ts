import * as vscode from 'vscode'
import { NamingColorNameHoverProvider } from './extensions/NamingColorNameHoverProvider'

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { scheme: 'file' },
      new NamingColorNameHoverProvider()
    )
  )
}

export function deactivate() {}
