# vscode extension naming color

色に名前を付ける vscode 拡張になります。

## color.json 更新

```
$ yarn exportColorJson
```

## インストール方法

### 1. vsix ファイルを作成

```
$ vsce package
 DONE  Packaged: /path/to/work dir/vscode-extension-naming-color-0.0.1.vsix (147 files, 9.17MB)
```

### 2. vsix ファイルからインストールする

1. vscode を開く
2. 拡張機能を開く
3. 右上の「...」から「VSIX からインストール...」を選択する
4. 出力した vsix ファイルを選択する
