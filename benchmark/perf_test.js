function standardDeviation(values){
  var avg = average(values);

  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    return diff * diff;
  });

  var avgSquareDiff = average(squareDiffs);

  return Math.sqrt(avgSquareDiff);
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  return sum / data.length;
}

function performSingleRun(runner) {
  runner.setupRun && runner.setupRun();

  var start = performance.now();
  runner.run.call(this);
  var duration = (performance.now() - start);

  runner.teardownRun && runner.teardownRun();

  return duration;
}

export default function perfTest(runner) {
  if(runner instanceof Function) {
    runner = {
      run: runner
    };
  }

  return function () {
    const maxRuns = 100,
        slidingWindowSize = 30,
        allowPercentagedDeviation = 4;

    let results = [];

    for(var i = 0; i < maxRuns; i++) {
      results.push(performSingleRun(runner));

      // if(results.length >= slidingWindowSize) {
      //   let time = average(results.slice(-slidingWindowSize));
      //   let percentagedStandardDeviation = 100 * standardDeviation(results.slice(-slidingWindowSize)) / time;
      //   if(percentagedStandardDeviation <= allowPercentagedDeviation) {
      //     break;
      //   }
      // }
    }

    let lastMeasurements = results.slice(-slidingWindowSize),
        time = average(lastMeasurements),
        deviation = 100 * standardDeviation(lastMeasurements) / time;

    this._runnable.title = JSON.stringify({
        name: this._runnable.title,
        average: time.toFixed(3),
        standardDeviation: deviation.toFixed(1),
        results: results
    });

    return time;
  };
};
