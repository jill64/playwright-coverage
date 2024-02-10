import { OptionDescriptions } from '@jill64/ts-cli/types'

export const options = {
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
} satisfies OptionDescriptions
