import perfTest from '../perf_test.js';
import { times, getRandomArrayOfLength } from './test-utils.js';
import rand from 'random-seed';

import { createRectangle } from './fixture.js';
import quickSort from './deps/quicksort.js';

import { numberOfAExprsToCreate } from './params.js';

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

import { reset } from 'aexpr-source-transformation-propagation';

describe('AExpr Construction', function() {
  this.timeout("200000s");

  describe("Same Object", function() {

    let rect = createRectangle(20, 10);

    it("Rewriting", perfTest({
      run() {
        for(let i = 0; i < numberOfAExprsToCreate; i++) {
          aexpr(() => rect.aspectRatio());
        }
      },
      teardownRun() {
        reset();
      }
    }));
  });

  describe("Different Object", function() {
    let rects;

    it("Rewriting", perfTest({
      setupRun() {
        rects = [];
        times(numberOfAExprsToCreate, () => rects.push(createRectangle(20, 10)));
      },
      run() {
        for(let i = 0; i < numberOfAExprsToCreate; i++) {
          let rect = rects[i];
          aexpr(() => rect.aspectRatio());
        }
      },
      teardownRun() {
        reset();
      }
    }));
  });
});

describe("Maintain Aspect Ratio", function() {
  this.timeout("2000s");

  let aspectRatioCount = 1000;
  const targetAspectRatio = 2;
  let aspectRatioRand = rand.create('aspectRatio');

  it("Rewriting", perfTest({
    run() {
      let rect = createRectangle(20, 10);
      // TODO: move aexpr creation to setup
      aexpr(() => rect.aspectRatio())
          .onChange(ratio => rect.height = rect.width / targetAspectRatio);

      for(let i = 0; i < aspectRatioCount; i++) {
        rect.width = aspectRatioRand.random();
        expect(rect.aspectRatio()).to.equal(targetAspectRatio);
      }
    },
    teardownRun() {
      reset();
    }
  }));
});

// TODO: remove duplicate with baseline
describe("Rewriting Transformation Impact", function() {
  this.timeout("2000s");

  let quickSortRand = rand.create('quickSort'),
      items;

  it("Rewriting", perfTest({
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
  this.timeout("2000s");

  for(let i = 0; i <= 10; i++) {
    let calculations = [];
    let items;

    it(`${i} of 10`, perfTest({
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

describe("AExpr and Callback Count (Rewriting)", function() {
  this.timeout("2000s");

  function makeTestCaseWith(numberOfAExprs, numberOfCallbacksPerAExpr) {
    let items;

    it(`${numberOfAExprs} aexprs, ${numberOfCallbacksPerAExpr} callbacks each`, perfTest({
      setupRun() {
        items = getRandomArrayOfLength(1000);

        let indexGenerator = rand.create('aexprIndexGenerator');
        for(let aexprId = 0; aexprId < numberOfAExprs; aexprId++) {
            // TODO: actually generate the index at random!
          let listener = aexpr(() => items[aexprId]);
          times(numberOfCallbacksPerAExpr, () => listener.onChange(() => {}));
        }
      },
      run() {
        quickSort(items);
      },
      teardownRun() {
        reset();
      }
    }));
  }

  // TODO: Bigger Counts
  times(5, numAExpr =>
    times(5, cbPerAExpr =>
        makeTestCaseWith(20 * numAExpr, 20 * cbPerAExpr)
    )
  );
});

