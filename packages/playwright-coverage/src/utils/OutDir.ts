import { rm } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export const OutDir = {
  set(output: string) {
    // Set the output directory
    const out = path.join(process.cwd(), output)

    process.env.PLAYWRIGHT_COVERAGE_OUTPUT = out

    // Clean up the output directory
    rm(out, {
      recursive: true,
      force: true
    })
  },
  get() {
    const out = process.env.PLAYWRIGHT_COVERAGE_OUTPUT

    if (!out) {
      throw new Error('PLAYWRIGHT_COVERAGE_OUTPUT is not set')
    }

    return out
  }
}
