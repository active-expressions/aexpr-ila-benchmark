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

export default function perfTest(runner, runs) {
  return function () {
    if (typeof runs == "undefined") {
      runs = 100;
    }
    var start = performance.now();
    for(var i = 0; i < runs; i++) {
      runner.call(this);
    }
    var time = (performance.now() - start) / runs;
    this._runnable.title += ": " + time.toFixed(3) + "ms";
    return time;
  };
};
