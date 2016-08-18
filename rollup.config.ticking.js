import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'benchmark/tests/ticking.js',
    dest: 'benchmark/bundles/ticking.js',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs()
    ],
    format: 'iife'
};
