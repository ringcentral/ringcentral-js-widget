import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import babelIstanbul from 'babel-istanbul';
import yargs from 'yargs';
import through from 'through2';
import path from 'path';
import fs from 'fs-extra';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import cp from 'child_process';
import transformLocaleLoader from 'locale-loader/transformLocaleLoader';
import dedent from 'dedent';
import exportLocale from 'locale-loader/exportLocale';
import importLocale from 'locale-loader/importLocale';

async function rm(filepath) {
  if (await fs.exists(filepath)) {
    if ((await fs.stat(filepath)).isDirectory()) {
      await Promise.all(
        (await fs.readdir(filepath))
          .map(item => rm(path.resolve(filepath, item)))
      );
      await fs.rmdir(filepath);
    } else {
      await fs.unlink(filepath);
    }
  }
}

async function exec(command) {
  return new Promise((resolve, reject) => {
    cp.exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

async function getVersionFromTag() {
  try {
    let tag = await exec('git describe --exact-match --tags $(git rev-parse HEAD)');
    tag = tag.replace(/\r?\n|\r/g, '');
    if (/^\d+.\d+.\d+/.test(tag)) {
      return tag;
    }
    return null;
  } catch (e) {
    return null;
  }
}

const BUILD_PATH = path.resolve(__dirname, '../../build/ringcentral-widgets');
gulp.task('clean', async () => (
  rm(BUILD_PATH)
));

gulp.task('build', ['clean', 'copy'], () => (
  gulp.src([
    './**/*.js',
    '!./**/*.test.js',
    '!./test{/**,}',
    '!./coverage{/**,}',
    '!./node_modules{/**,}',
    '!gulpfile.babel.js']
  ).pipe(transformLocaleLoader())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD_PATH))
));

gulp.task('copy', ['clean'], () => (
  gulp.src([
    './**',
    '!./**/*.js',
    '!./test{/**,}',
    '!./coverage{/**,}',
    '!./node_modules{/**,}',
    '!package-lock.json'
  ]).pipe(gulp.dest(BUILD_PATH))
));

const RELEASE_PATH = path.resolve(__dirname, '../../release/ringcentral-widgets');
gulp.task('release-clean', async () => {
  if (!await fs.exists(RELEASE_PATH)) {
    await exec(`mkdir -p ${RELEASE_PATH}`);
  }
  const files = (await fs.readdir(RELEASE_PATH)).filter(file => !/^\./.test(file));
  for (const file of files) {
    await rm(path.resolve(RELEASE_PATH, file));
  }
});

gulp.task('release-copy', ['build', 'release-clean'], () => (
  gulp.src([
    `${BUILD_PATH}/**`,
    `${__dirname}/README.md`,
    `${__dirname}/LICENSE`
  ]).pipe(gulp.dest(RELEASE_PATH))
));

gulp.task('release', ['release-copy'], async () => {
  const packageInfo = JSON.parse(await fs.readFile(path.resolve(BUILD_PATH, 'package.json')));
  delete packageInfo.scripts;
  delete packageInfo.jest;
  const version = await getVersionFromTag();
  if (version) {
    packageInfo.version = version;
    packageInfo.name = 'ringcentral-widgets';
  }
  await fs.writeFile(path.resolve(RELEASE_PATH, 'package.json'), JSON.stringify(packageInfo, null, 2));
});

function normalizeName(str) {
  return str.split(/[-_]/g)
    .map((token, idx) => (
      `${idx > 0 ? token[0].toUpperCase() : token[0].toLowerCase()}${token.toLowerCase().substr(1)}`
    ))
    .join('');
}

gulp.task('generate-font', async () => {
  try {
    const cssLocation = path.resolve(__dirname, 'assets/DynamicsFont/style.css');
    const content = await fs.readFile(cssLocation, 'utf8');
    let output = content
      .replace(/url\('fonts\/dynamics_icon/g, "url('./fonts/dynamics_icon")
      .replace('[class^="icon-"], [class*=" icon-"]', '.icon');
    const regExp = /\.icon-(.*):before/;
    let match;
    do {
      match = regExp.exec(output);
      if (match) {
        const [target, name] = match;
        const normalizedName = normalizeName(name);
        const newContent = dedent`
      .${normalizedName} {
        composes: icon;
      }
      .${normalizedName}:before `;
        output = output.replace(target, newContent);
      }
    } while (match);
    await fs.writeFile(path.resolve(__dirname, 'assets/DynamicsFont/DynamicsFont.scss'), output, 'utf8');
  } catch (error) {
    console.log(error);
  }
});

gulp.task('export-locale', () => exportLocale({
  sourceFolder: './',
}));
gulp.task('export-locale-full', () => exportLocale({
  sourceFolder: './',
  exportType: 'full'
}));
gulp.task('export-locale-translated', () => exportLocale({
  sourceFolder: './',
  exportType: 'translated'
}));
gulp.task('import-locale', () => importLocale({
  sourceFolder: './',
}));
