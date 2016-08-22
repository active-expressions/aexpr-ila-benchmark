import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import quickSort from './deps/quicksort.js';

describe('Rewriting Benchmarks', function() {
  this.timeout("2000s");

  describe("Run", function() {

    let aspectRatioCount = 1000;
    const targetAspectRatio = 2;
    let aspectRatioRand = rand.create('aspectRatio');

    it("Maintain Aspect Ratio", perfTest(function () {
      let rect = createRectangle(20, 10);
      aexpr(() => rect.aspectRatio())
          .onChange(ratio => rect.height = rect.width / targetAspectRatio);

      for(let i = 0; i < aspectRatioCount; i++) {
        rect.width = aspectRatioRand.random();
        expect(rect.aspectRatio()).to.equal(targetAspectRatio);
      }
    }));
  });

  // TODO: remove duplicate with baseline
  describe("Run", function() {

    let quickSortRand = rand.create('quickSort'),
        items;

    it("Quicksort", perfTest({
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
});
