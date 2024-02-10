#!/usr/bin/env node

import process from 'node:process'
import { plc } from '../plc/index.js'

plc.run(process.argv)
