const nearestColors = require('nearest-color')
const rgbHex = require('rgb2hex')

import { Colors } from '../types'

export class ColorNamer {
  public readonly origin: string
  public readonly hex: string
  private _colors: { [key: string]: string }
  private _matchName: string | undefined
  private _nearestName: string | undefined

  constructor(origin: string, colors: Colors = {}) {
    this.origin = origin
    this.hex = rgbHex(origin).hex
    this._colors = colors
  }

  public get matchName() {
    if (!this._matchName) {
      this._matchName = this._namingMatchName()
    }
    return this._matchName
  }

  public get nearestName() {
    if (!this._nearestName) {
      this._nearestName = this._namingNearestName()
    }
    return this._nearestName
  }

  /**
   * 完全一致する色名を取得する
   */
  public _namingMatchName(): string {
    const key = Object.keys(this._colors).find(
      (key: string) => this._colors[key] === this.hex
    )
    return key ? key : ''
  }

  /**
   * 近似する色名を取得する
   */
  public _namingNearestName(): string {
    const nearest = nearestColors.from(this._colors)
    const nearestName = nearest(this.hex)
    return nearestName ? nearestName.name : ''
  }
}
