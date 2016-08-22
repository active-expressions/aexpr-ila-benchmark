import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import * as path from 'path';

export default {
    entry: 'benchmark/tests/rewriting.js',
    dest: 'benchmark/temp/rewriting/rewriting_aexpr.js',
    external: [
        path.resolve('benchmark/tests/deps/toSkip0.js'),
        path.resolve('benchmark/tests/deps/toSkip1.js'),
        path.resolve('benchmark/tests/deps/toSkip2.js'),
        path.resolve('benchmark/tests/deps/toSkip3.js'),
        path.resolve('benchmark/tests/deps/toSkip4.js'),
        path.resolve('benchmark/tests/deps/toSkip5.js'),
        path.resolve('benchmark/tests/deps/toSkip6.js'),
        path.resolve('benchmark/tests/deps/toSkip7.js'),
        path.resolve('benchmark/tests/deps/toSkip8.js'),
        path.resolve('benchmark/tests/deps/toSkip9.js')
    ],
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs()
    ]
};
