#!/usr/bin/env babel-node

import commander from 'commander';
import info from '../package';
import run from '../lib/run';

commander
  .version(info.version)
  .usage('<command> [options]');

commander
  .command('run [dir...]')
  .description('Run E2E test specified case.')
  .option('-P, --params <paramsInfo>', 'Run E2E test case with some params filtering.')
  .option('-S, --sandbox', 'Run E2E test case with \'sandbox\' mode.')
  .option('-D, --debugger', 'Run E2E test case with \'debugger\' mode.')
  .option('-E, --exclude <exclude>', 'Run E2E test case exclude some files.', value => value.split(','))
  .option('--drivers <drivers>', 'Run E2E test case with some drivers.', value => value.split('.'))
  .option('--testerCLI <testerCLI>', 'Run E2E test case with testerCLI args.', value => value.split('.'))
  .action((run));

commander.parse(process.argv);

if (!commander.args.length) {
  commander.help();
}
