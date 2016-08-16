/*
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import npm from 'rollup-plugin-npm';
import { argv } from 'yargs';

const format = argv.format || argv.f || 'iife';
const compress = argv.uglify;

const babelOptions = {
    exclude: 'node_modules/!**',
    presets: ['es2015-rollup', 'stage-0'],
    babelrc: false
};

const dest = {
    amd: `dist/amd/i18nextBrowserLanguageDetector${compress ? '.min' : ''}.js`,
    umd: `dist/umd/i18nextBrowserLanguageDetector${compress ? '.min' : ''}.js`,
    iife: `dist/iife/i18nextBrowserLanguageDetector${compress ? '.min' : ''}.js`
}[format];

export default {
    entry: 'src/index.js',
    format,
    plugins: [
        babel(babelOptions),
        npm({ jsnext: true })
    ].concat(compress ? uglify() : []),
    moduleName: 'i18nextBrowserLanguageDetector',
    moduleId: 'i18nextBrowserLanguageDetector',
    dest
};
*/
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'benchmark/simple.js',
    dest: 'benchmark/out.js',
    plugins: [
        nodeResolve({
            jsnext: true
        })
    ]
};
