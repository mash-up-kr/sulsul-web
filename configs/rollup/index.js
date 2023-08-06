const path = require('path');
const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve').default;
const builtins = require('builtin-modules');
const { visualizer } = require('rollup-plugin-visualizer');

exports.generateRollupConfig = function generateRollupConfig({ packageDir }) {
  const packageJSON = require(path.join(packageDir, 'package.json'));

  if (packageJSON.exports == null) {
    throw new Error('package.json의 exports 필드를 정의해주세요.');
  }

  const entryPoints = Object.keys(packageJSON.exports).filter(
    (x) => x !== './package.json'
  );

  const external = (pkg) => {
    const externals = [
      ...Object.keys({ ...packageJSON.dependencies, ...packageJSON.peerDependencies }),
      ...builtins,
    ];

    return externals.some((externalPkg) => {
      return pkg.startsWith(externalPkg);
    });
  };

  const extensions = ['.js', '.jsx', '.ts', '.tsx'];

  const build = (format) => (input, output) => {
    const isESMFormat = format === 'es';
    return {
      input,
      external,
      output: [
        {
          format,
          ...(isESMFormat
            ? {
                dir: path.dirname(output),
                entryFileNames: `[name]${path.extname(output)}`,
                preserveModulesRoot: path.dirname(input),
                preserveModules: isESMFormat,

                /**
                 * This is required to prevent the error:
                 *
                 * TypeError: createContext only works in Client Components.
                 * Add the "use client" directive at the top of the file to use it.
                 *
                 * -----
                 *
                 * Here is the Rollup documentation on `banner`:
                 * A string to prepend/append to the bundle. You can also
                 * supply a function that returns a Promise that resolves
                 * to a string to generate it asynchronously
                 *
                 * (Note: banner and footer options will not
                 * break sourcemaps).
                 */
                banner: "'use client';",
              }
            : {
                file: output,
                banner: "'use client';",
              }),
        },
      ],
      plugins: [
        resolve({
          extensions,
        }),
        commonjs(),
        babel({
          extensions,
          babelHelpers: 'bundled',
          rootMode: 'upward',
        }),
        json(),
        visualizer({
          title: `${packageJSON.name}'s bundle size`,
          gzipSize: true,
        }),
      ],
    };
  };

  return entryPoints.flatMap((entrypoint) => {
    const cjsEntrypoint = path.resolve(
      packageDir,
      ensure(
        handleCJSEntrypoint(packageJSON.exports, entrypoint),
        'CJS entrypoint not found'
      )
    );
    const cjsOutput = path.resolve(
      packageDir,
      ensure(
        packageJSON?.publishConfig.exports?.[entrypoint].require,
        'CJS outputfile not found'
      )
    );

    const esmEntrypoint = path.resolve(
      packageDir,
      ensure(
        handleESMEntrypoint(packageJSON.exports, entrypoint),
        'ESM entrypoint not found'
      )
    );
    const esmOutput = path.resolve(
      packageDir,
      ensure(
        packageJSON?.publishConfig.exports?.[entrypoint].import,
        'ESM outputfile not found'
      )
    );

    return [
      build('cjs')(cjsEntrypoint, cjsOutput),
      build('es')(esmEntrypoint, esmOutput),
    ];
  });
};

function handleCJSEntrypoint(exports, entrypoint) {
  if (exports?.[entrypoint].require != null) {
    return exports?.[entrypoint].require;
  }

  if (typeof exports?.[entrypoint] === 'string') {
    return exports?.[entrypoint];
  }

  return undefined;
}

function handleESMEntrypoint(exports = {}, entrypoint) {
  if (exports?.[entrypoint].import != null) {
    return exports?.[entrypoint].import;
  }

  if (typeof exports?.[entrypoint] === 'string') {
    return exports?.[entrypoint];
  }

  return undefined;
}

function ensure(value, message) {
  if (value == null) {
    throw new Error(message);
  }

  return value;
}
