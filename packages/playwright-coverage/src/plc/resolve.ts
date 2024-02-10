import type { NodeV8Coverage } from '@jill64/v8-resolver'
import { resolve as resolver } from '@jill64/v8-resolver'
import path from 'node:path'
import {
  CLIENT_RAW_DIR,
  CLIENT_RESOLVED_DIR,
  SERVER_RAW_DIR,
  SERVER_RESOLVED_DIR
} from '../constants.js'
import { OutDir } from '../utils/OutDir.js'
import { Context } from './types/Context.js'
import { thinning } from './utils/thinning.js'
import { transformDir } from './utils/transformDir.js'

const server = async (root: string) => {
  const outDir = OutDir.get()

  const from = path.join(outDir, SERVER_RAW_DIR)
  const to = path.join(outDir, SERVER_RESOLVED_DIR)

  await transformDir(from, to, async (source: string) => {
    const {
      result,
      timestamp,
      'source-map-cache': cache
    } = JSON.parse(source) as NodeV8Coverage

    const resolved = await resolver(
      {
        result: result.filter(thinning),
        timestamp,
        'source-map-cache': cache
      },
      {
        root
      }
    )

    const redacted = resolved.map((x) => ({
      ...x,
      source: undefined
    }))

    const str = JSON.stringify(redacted)

    return str
  })
}

const client = async (root: string) => {
  const outDir = OutDir.get()

  const from = path.join(outDir, CLIENT_RAW_DIR)
  const to = path.join(outDir, CLIENT_RESOLVED_DIR)

  await transformDir(from, to, async (source: string): Promise<string> => {
    const result = JSON.parse(source)

    const resolved = await resolver(
      {
        result,
        timestamp: Date.now(),
        'source-map-cache': {}
      },
      {
        root
      }
    )

    const redacted = resolved.map((x) => ({
      ...x,
      source: undefined
    }))

    return JSON.stringify(redacted)
  })
}

export const resolve = async ({ root }: Context) => {
  await Promise.all([client(root), server(root)])
}
