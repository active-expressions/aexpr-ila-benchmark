import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import quickSort from './deps/quicksort.js';

import rewrittenCalc1 from './deps/toRewrite1.js';
import rewrittenCalc2 from './deps/toRewrite2.js';
import rewrittenCalc3 from './deps/toRewrite3.js';
import rewrittenCalc4 from './deps/toRewrite4.js';
import rewrittenCalc5 from './deps/toRewrite5.js';
import rewrittenCalc6 from './deps/toRewrite6.js';
import rewrittenCalc7 from './deps/toRewrite7.js';
import rewrittenCalc8 from './deps/toRewrite8.js';
import rewrittenCalc9 from './deps/toRewrite9.js';
import rewrittenCalc0 from './deps/toRewrite0.js';

import plainCalc1 from './deps/toSkip1.js';
import plainCalc2 from './deps/toSkip2.js';
import plainCalc3 from './deps/toSkip3.js';
import plainCalc4 from './deps/toSkip4.js';
import plainCalc5 from './deps/toSkip5.js';
import plainCalc6 from './deps/toSkip6.js';
import plainCalc7 from './deps/toSkip7.js';
import plainCalc8 from './deps/toSkip8.js';
import plainCalc9 from './deps/toSkip9.js';
import plainCalc0 from './deps/toSkip0.js';

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

  describe("Partially Rewritten", function() {

    for(let i = 0; i <= 10; i++) {
      let calculations = [];
      let items;

      it(`Partially Rewritten (${i} of 10)`, perfTest({
        setupRun() {
          let quickSortRand = rand.create('partiallyRewritten');

          calculations[0] = i > 0 ? rewrittenCalc0 : plainCalc0;
          calculations[1] = i > 1 ? rewrittenCalc1 : plainCalc1;
          calculations[2] = i > 2 ? rewrittenCalc2 : plainCalc2;
          calculations[3] = i > 3 ? rewrittenCalc3 : plainCalc3;
          calculations[4] = i > 4 ? rewrittenCalc4 : plainCalc4;
          calculations[5] = i > 5 ? rewrittenCalc5 : plainCalc5;
          calculations[6] = i > 6 ? rewrittenCalc6 : plainCalc6;
          calculations[7] = i > 7 ? rewrittenCalc7 : plainCalc7;
          calculations[8] = i > 8 ? rewrittenCalc8 : plainCalc8;
          calculations[9] = i > 9 ? rewrittenCalc9 : plainCalc9;

          items = [];
          for(let j = 0; j < 30; j++) { // 50
            items.push(quickSortRand.random());
          }
        },
        run() {
          calculations.forEach(calc => calc(items));
        }
      }));
    }
  });
});
