import { App } from '@jill64/ts-cli'
import { spawn } from 'node:child_process'
import process from 'node:process'
import { postprocess } from './postprocess.js'
import { preprocess } from './preprocess.js'

export const plc = new App(
  {
    options: {
      serve: {
        alias: 's',
        description: 'Path to source root',
        type: 'string'
      },
      output: {
        alias: 'o',
        description: 'Output directory',
        type: 'string'
      },
      help: {
        alias: 'h',
        description: 'Show help',
        type: 'string'
      },
      version: {
        alias: 'v',
        description: 'Show version',
        type: 'string'
      },
      quiet: {
        alias: 'q',
        description: 'Suppress logging',
        type: 'string'
      },
      debug: {
        alias: 'd',
        description: 'Debug mode',
        type: 'string'
      }
    },
    rest: {
      placeholder: 'command',
      description: 'Playwright test command'
    }
  },
  async ({ options, rest }) => {
    if (!rest?.length) {
      throw new Error('Command is required')
    }

    const ctx = await preprocess(options?.output)

    const command = rest.join(' ')

    const sub = spawn(command, {
      stdio: 'inherit',
      shell: true
    })

    return new Promise((resolve) => {
      const close = async () => {
        await postprocess(ctx)

        resolve()
      }

      sub.once('exit', close)
      process.on('SIGINT', resolve)
      process.on('SIGHUP', resolve)
    })
  }
)
