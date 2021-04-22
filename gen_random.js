
const fs = require('fs')

const list = fs.readFileSync('cities.txt').toString().split('\n')
const maxLen = Math.max(...list.map((item) => item.length))
const byPosition = new Array(maxLen).fill().map((_, i) => list.map((item) => item.substring(i, i + 1)))
const freqsByPosition = byPosition.map((list) =>list.reduce((acc, item) => (acc[item] = (acc[item] || 0) + 1, acc), {}))
const sorted = freqsByPosition.map((map) => Object.entries(map).sort(([c1, f1], [c2, f2]) => f2 - f1))
const result = '\t{\n' + sorted.map((entries) => entries.map(([c, f]) => [c, Math.round(Math.log2(f))]).filter(([c, f]) => f > 0).map(([c, f]) => `\t\ttext("${c}", ${f})`).join(',\n')).join('\n\t}\n\t{\n') + '\n\t}'
fs.writeFileSync('out.txt', result)