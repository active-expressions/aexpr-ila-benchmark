import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'benchmark/temp/rewriting_babel_out.js',
    dest: 'benchmark/bundles/rewriting.js',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs()
    ],
    format: 'iife'
};
