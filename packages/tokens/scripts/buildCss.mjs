import { writeFileSync } from 'node:fs'

import { semanticColors } from '../dist/funnow.js'
import { toCssVariables } from '../dist/internal/toCssVariables.js'

writeFileSync(new URL('../dist/funnow.css', import.meta.url), toCssVariables(semanticColors))
