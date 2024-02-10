import { Spinner } from 'cli-spinner'
import kleur from 'kleur'
import path from 'node:path'
import { SERVER_RAW_DIR } from '../constants.js'
import { OutDir } from '../utils/OutDir.js'
import { TmpDir } from '../utils/TmpDir.js'
import { mv } from '../utils/mv.js'
import { convert } from './convert/index.js'
import { merge } from './merge.js'
import { report } from './report/index.js'
import { resolve } from './resolve.js'
import { Context } from './types/Context.js'

export const postprocess = async (ctx: Context) => {
  const { logger } = ctx
  const quiet = !logger.log

  logger.debug(`tmpDir: ${TmpDir.get()}`)
  logger.debug(`outDir: ${OutDir.get()}\n`)

  const spinner = quiet ? null : new Spinner(kleur.cyan('Analyzing...'))

  spinner?.start()

  // Copy server coverage to the dist directory
  const dist = path.join(OutDir.get(), SERVER_RAW_DIR)
  await mv(TmpDir.get(), dist)

  try {
    await resolve(ctx)
    await merge()
    await convert()
    await report()

    spinner?.stop(true)

    logger.log(
      kleur.bold().green('✅ Coverage measurements have been completed.\n')
    )
  } catch (e) {
    spinner?.stop(true)

    logger.error(e)
    logger.error(
      kleur.bold().red('❌ Coverage measurements have been failed.\n')
    )
  }
}
