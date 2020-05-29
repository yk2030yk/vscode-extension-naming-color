import * as vscode from "vscode";
const rgb2hex = require("rgb2hex");
import { extractColor } from "./validate";
import { searchMatchColor, searchNearestColor } from "./colorName";

const hover = (code: string, name: string) => {
  return new vscode.Hover(
    new vscode.MarkdownString(`Recommend Color Name: ${code} => ${name}`)
  );
};

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.languages.registerHoverProvider(
    { language: "typescript", scheme: "file" },
    {
      provideHover(document: vscode.TextDocument, position: vscode.Position) {
        const t = document.lineAt(position);
        const fex = extractColor(t.text);
        const c = rgb2hex(fex);
        const name = searchMatchColor(c);

        if (name) return hover(fex, name);

        const a = searchNearestColor(fex);
        if (a) return hover(fex, a);

        return;
      },
    }
  );

  context.subscriptions.push(disposable);
};

// this method is called when your extension is deactivated
export function deactivate() {}
