import { times } from './tests/test-utils.js';

function performSingleRun(runner) {
    runner.setupRun && runner.setupRun();

    var start = performance.now();
    runner.run.call(this);
    var duration = (performance.now() - start);

    runner.teardownRun && runner.teardownRun();

    return duration;
}

export default function perfTest(it, name, runner) {
    if(runner instanceof Function) {
        runner = {
            run: runner
        };
    }

    const maxRuns = 100;

    times(maxRuns, i => {
        it(name, function () {
            let duration = performSingleRun(runner);

            this._runnable.title = JSON.stringify({
                name: this._runnable.title,
                duration,
                index: i
            });

            return duration;
        });
    });
};
