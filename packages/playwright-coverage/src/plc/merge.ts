import { attempt } from '@jill64/attempt'
import { V8Coverage, merge as mergeCoverage } from '@jill64/v8-resolver'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import {
  CLIENT_RESOLVED_DIR,
  V8_FINAL_FILE,
  SERVER_RESOLVED_DIR
} from '../constants.js'
import { OutDir } from '../utils/OutDir.js'
import { nonNullable } from '../utils/nonNullable.js'
import { thinning } from './utils/thinning.js'

export const merge = async () => {
  const ourDir = OutDir.get()

  const client = path.join(ourDir, CLIENT_RESOLVED_DIR)
  const server = path.join(ourDir, SERVER_RESOLVED_DIR)

  const allFiles = await Promise.all([
    readdir(client, {
      withFileTypes: true
    }),
    readdir(server, {
      withFileTypes: true
    })
  ])

  const allData = await Promise.all(
    allFiles.flat().map((x) =>
      x.isFile()
        ? attempt(async () => {
            const filepath = path.join(x.path, x.name)
            const str = await readFile(filepath, 'utf-8')
            const json = JSON.parse(str) as V8Coverage
            return json
          }, null)
        : null
    )
  )

  const merged = mergeCoverage(
    allData.filter(nonNullable).flat().filter(thinning)
  )

  const to = path.join(ourDir, V8_FINAL_FILE)

  await writeFile(to, JSON.stringify(merged))
}
