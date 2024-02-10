<!----- BEGIN GHOST DOCS HEADER ----->

# playwright-coverage


<!----- BEGIN GHOST DOCS BADGES ----->
<a href="https://github.com/jill64/playwright-coverage/actions/workflows/ci.yml"><img src="https://github.com/jill64/playwright-coverage/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a>
<!----- END GHOST DOCS BADGES ----->


☂️ E2E Coverage Measurement for Playwright

<!----- END GHOST DOCS HEADER ----->

# 🚧 WIP

Not available yet

## Installation

```sh
npm i -D @jill64/playwright-coverage
```

## Setup

1. Configure your bundler settings to output source maps

for example `vite`

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  build: {
    sourcemap: 'inline'
  }
})
```

> [!TIP]
>
> `NODE_V8_COVERAGE` is enabled only in coverage mode.

2. Use `@jill64/playwright-coverage/test` instead of `@playwright/test` in your tests

```diff
- import { test, expect } from '@playwright/test'
+ import { test, expect } from '@jill64/playwright-coverage/test'
```

## Usage

Run test command with `plc`(<u>**pl**</u>aywright <u>**c**</u>overage)

```sh
plc playwright test
```

> [!NOTE]
>
> The `playwright` coverage API is currently [supported by Chromium-based browsers](https://playwright.dev/docs/api/class-coverage).  
> If the test is run on a browser other than `chromium`, the test run will not be blocked, but a warning will be displayed in the console and no coverage will be collected.

## Options

If pass options to `plc`, before the test command.

```sh
plc --output coverage-result playwright test
```

| option    | short | description          |
| --------- | ----- | -------------------- |
| --output  | -o    | output directory     |
| --help    | -h    | show help            |
| --version | -v    | show version         |
| --quiet   | -q    | suppress log         |
| --debug   | -d    | debug mode           |
| --root    | -r    | root directory       |
| --base    | -b    | source-map base path |

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

[MIT](LICENSE)

<!----- END GHOST DOCS FOOTER ----->
