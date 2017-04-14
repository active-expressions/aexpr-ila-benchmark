# active-expressions-benchmark
Performs benchmark for all active expression implementations, and pushes the results to the [result repository](https://github.com/active-expressions/active-expressions-benchmark-results).

### General

The benchmark suite contains two part: Bundling and Benchmarking.

You can trigger a full build and benchmark run using `npm test`.

Bundles are stores under `bundles` and consumed by the respective testing framework.

To create a particular bundle use `npm run build-{baseline, ticking, rewriting, interpretation}`. Use `npm run build-all` for a full build.
To develop new benchmarks, run the bundling in watch mode using `npm run watch-{baseline, ticking, rewriting, interpretation}`.

### Libraries Under Test
Are included as subtrees:

- `git subtree add -P ila/plain https://github.com/active-expressions/programming-contextjs-plain.git master`
- `git subtree add -P ila/aexpr https://github.com/active-expressions/programming-contextjs-aexpr.git master`

### Local Usage

You can either run the benchmarks using Karma or by using Mocha directly:

For Karma:

Run `karma start` to work in watch mode, or `karma start --single-run` for one-time measurements.

Karma load all compiled files under `bundles`, so delete some if you want to focus on particular benchmarks.

Results are located under `results/latest.json`.

For Mocha:

Simply navigate your browser to the `benchmark/index.html`.

Modify this particular file to decide what files should be benchmarked.

### For Travis CI

Travis needs a generated [access token](https://github.com/settings/tokens/new) set as environment variable `GH_TOKEN`.

After a successful benchmark run, the results are automatically pushed to the dedicated [result repository](https://github.com/active-expressions/active-expressions-benchmark-results).
