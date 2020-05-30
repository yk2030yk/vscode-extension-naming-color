const rgb2hex = require('rgb2hex')

import { namingMatchName, namingNearestName } from './naming'

const c = rgb2hex('rgb(1, 1, 1)').hex

const m = namingMatchName(c)

const n = namingNearestName(c)

console.log(`
${c}
${m}
${n}
`)
