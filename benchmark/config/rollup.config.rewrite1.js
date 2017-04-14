import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import * as path from 'path';

var skippedCodebase = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (num) {
    return path.resolve('benchmark/tests/deps/toSkip' + num + '.js');
}).concat([
    'aexpr-source-transformation-propagation',
    'ila/plain/src/Layers.js',
    'ila/aexpr/src/Layers.js'
]);

export default {
    entry: 'benchmark/tests/rewriting.js',
    dest: 'benchmark/temp/rewriting/rewriting_babel_in.js',
    external: skippedCodebase,
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs()
    ]
};
