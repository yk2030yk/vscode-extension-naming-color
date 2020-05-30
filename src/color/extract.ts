const colorRegex = new RegExp(
  /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/g
)

const _extract = (code: string, regex: RegExp) => {
  const match = code.match(regex)
  if (!match) return []
  return match
}

export const extractColor = (code: string) => _extract(code, colorRegex)
