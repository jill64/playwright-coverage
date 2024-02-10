import { NormalizedOptions } from '@jill64/ts-cli/types'
import kleur from 'kleur'
import path from 'node:path'
import { OutDir } from '../utils/OutDir.js'
import { TmpDir } from '../utils/TmpDir.js'
import { options } from './options.js'
import packageJson from '../../package.json' assert { type: 'json' }
import { help as helpMessage } from './help.js'

const empty = () => {}

export const preprocess = async (
  opts?: Partial<NormalizedOptions<typeof options>>
) => {
  const {
    output = 'coverage/e2e',
    help,
    version,
    serve,
    quiet,
    debug
  } = opts ?? {}

  if (help) {
    console.log(helpMessage)
    process.exit(0)
  }

  if (version) {
    console.log(packageJson.version)
    process.exit(0)
  }

  const logger = {
    log: quiet ? empty : console.log,
    debug: !quiet && debug ? console.debug : empty,
    error: quiet ? empty : console.error
  }

  logger.log(
    kleur.cyan(
      `
--------------------------------------------------------
${kleur.bold('☂️ playwright-coverage')}
--------------------------------------------------------
`
    )
  )

  await Promise.all([TmpDir.generate(), OutDir.set(output)])

  logger.log(kleur.cyan('Measuring coverage...'))

  const cwd = process.cwd()
  const root = serve ? path.join(cwd, serve) : cwd

  return {
    root,
    logger
  }
}
