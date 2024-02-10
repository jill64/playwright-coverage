import kleur from 'kleur'
import path from 'node:path'
import { OutDir } from '../utils/OutDir.js'
import { TmpDir } from '../utils/TmpDir.js'

export const preprocess = async (output = 'coverage/e2e') => {
  console.log(
    kleur.cyan(
      `
--------------------------------------------------------
${kleur.bold('☂️ playwright-coverage')}
--------------------------------------------------------
`
    )
  )

  await Promise.all([TmpDir.generate(), OutDir.set(output)])

  console.log(kleur.cyan('Measuring coverage...'))

  return {
    root:
      // process.cwd()
      path.join(
        process.cwd(),
        'packages/demo',
        '.svelte-kit',
        'output',
        'client'
      )
  }
}
