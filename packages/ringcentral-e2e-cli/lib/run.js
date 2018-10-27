import { resolve } from 'path';
import fs from 'fs';
import runner from '../src/runner.js';
import { isNil } from '../src/utils/checkType';

const DEFAULT_CONFIG_FILE_PATH = './e2e.config.js';
const DEFAULT_ROOT = '<rootDir>';
const DEFAULT_TEST_MATCH = '**/?(*.)+(spec|test).js?(x)';
const configPath = resolve(process.cwd(), DEFAULT_CONFIG_FILE_PATH);

function getArgs(dir, cmd) {
  let args;
  try {
    args = cmd.params ? JSON.parse(`{"params": ${cmd.params}}`) : {};
  } catch (e) {
    console.error('Unexpected params parameters format.');
    process.exit();
  }
  args.paths = dir;
  return args;
}

function getTestMatch(args) {
  return (
    args.paths.length > 0 ?
      args.paths.map((path) => {
        const isFile = (/.js$/).test(path);
        if (!isFile) {
          path = `${path}/**/*.js`;
        }
        return `${DEFAULT_ROOT}/${path.replace(/^\.\//, '')}`;
      }) :
      [`${DEFAULT_ROOT}/${DEFAULT_TEST_MATCH}`]
  );
}


const run = async (dir, cmd) => {
  // if params exit and is a json file, read params file as cmd params
  if (cmd.params && (/.json$/).test(cmd.params)) {
    try {
      cmd.params = fs.readFileSync(resolve(__dirname, cmd.params), 'utf-8');
    } catch (error) {
      console.log(error);
    }
  }
  if (isNil(dir)) {
    console.error('Unexpected parameters format.');
    process.exit();
    return;
  }
  const args = getArgs(dir, cmd);
  let config;
  try {
    // eslint-disable-next-line
    config = require(configPath);
  } catch (error) {
    console.error(`Unexpected import '${DEFAULT_CONFIG_FILE_PATH}' in root path.`);
    console.error(error);
    process.exit();
    return;
  }
  const testMatch = getTestMatch(args);
  const modes = [
    ...cmd.sandbox ? ['sandbox'] : [],
    ...cmd.debugger ? ['debugger'] : [],
    ...cmd.headless ? ['headless'] : [],
  ];
  const drivers = cmd.drivers || [];
  const params = args.params || {};
  const testPathIgnorePatterns = cmd.exclude || [];
  const testerCLI = cmd.testerCLI || [];
  const testerParams = {
    verbose: true,
    testMatch,
    testPathIgnorePatterns
  };
  const testParams = {
    testerParams,
    testerCLI,
    modes,
    drivers,
    params,
    config,
  };
  const exit = () => {
    process.exit();
  };
  runner(testParams, {
    exit
  });
};

export {
  run as default,
  configPath
};
