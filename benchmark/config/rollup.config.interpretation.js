import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'benchmark/tests/interpretation.js',
    dest: 'benchmark/temp/interpretation/interpretation_babel_in.js',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
            skip: [ 'aexpr-interpretation' ]
        }),
        commonjs()
    ]
};
