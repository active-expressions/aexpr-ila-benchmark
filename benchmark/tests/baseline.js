import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import quickSort from './deps/quicksort.js';

describe("Maintain Aspect Ratio", function() {
  this.timeout("2000s");

  let aspectRatioCount = 1000;
  const targetAspectRatio = 2;
  let aspectRatioRand = rand.create('aspectRatio');

  it("Baseline", perfTest(function () {
    let rect = createRectangle(20, 10);

    for(let i = 0; i < aspectRatioCount; i++) {
      rect.width = aspectRatioRand.random();
      rect.height = rect.width / targetAspectRatio;
      expect(rect.aspectRatio()).to.equal(targetAspectRatio);
    }
  }));
});

// TODO: remove duplicate with rewriting
describe("Rewriting Transformation Impact", function() {
  this.timeout("2000s");

  let quickSortRand = rand.create('quickSort'),
      items;

  it("Baseline", perfTest({
    setupRun() {
      items = [];
      for(let i = 0; i < 1000; i++) {
        items.push(quickSortRand.random());
      }
    },
    run() {
      quickSort(items);
    }
  }));
});
