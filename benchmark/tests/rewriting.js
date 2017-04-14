import perfTest from '../perf_test.js';
import { times, getRandomArrayOfLength } from './test-utils.js';
import rand from 'random-seed';

import { createRectangle } from './fixture.js';
import quickSort from './deps/quicksort.js';

import {
  numberOfAExprsToCreate,
    mochaTimeout,
    aspectRatioCount,
    targetAspectRatio,
numberOfAExprs,
callbacksPerAExpr,
rewritingImpactArraySize
} from './params.js';

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

import { Layer } from '../../ila/layer.js';

describe('AExpr Construction', function() {
  this.timeout(mochaTimeout);

  describe("Same Object", function() {

    let rect = createRectangle(20, 10);

    perfTest(it, "Rewriting", {
      run() {
        for(let i = 0; i < numberOfAExprsToCreate; i++) {
          aexpr(() => rect.aspectRatio());
        }
      },
      teardownRun() {
        reset();
      }
    });
  });

  describe("Different Object", function() {
    let rects;

    perfTest(it, "Rewriting", {
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
    });
  });
});

describe("Maintain Aspect Ratio", function() {
  this.timeout(mochaTimeout);

  let aspectRatioRand = rand.create('aspectRatio');
    let randomWidths;
    let rect;

    perfTest(it, "Rewriting", {
      setupRun() {
          rect = createRectangle(20, 10);
          aexpr(() => rect.aspectRatio())
              .onChange(ratio => rect.height = rect.width / targetAspectRatio);
          randomWidths = [];
          for(let i = 0; i < aspectRatioCount; i++) {
              randomWidths.push(aspectRatioRand.random());
          }
      },
    run() {
        randomWidths.forEach(val => {
            rect.width = val;
            expect(rect.aspectRatio()).to.equal(targetAspectRatio);
        });
    },
    teardownRun() {
      reset();
    }
  });
});

// TODO: remove duplicate with baseline
describe("Rewriting Transformation Impact", function() {
  this.timeout(mochaTimeout);

  let quickSortRand = rand.create('quickSort'),
      items;

  perfTest(it, "Rewriting", {
    setupRun() {
      items = [];
      for(let i = 0; i < rewritingImpactArraySize; i++) {
        items.push(quickSortRand.random());
      }
    },
    run() {
      quickSort(items);
    }
  });
});


describe("Partially Rewritten", function() {
  this.timeout(mochaTimeout);

  for(let i = 0; i <= 10; i++) {
    let calculations = [];
    let items;

    perfTest(it, `${i} of 10`, {
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
    });
  }
});

// describe("AExpr and Callback Count (Rewriting)", function() {
//   this.timeout(mochaTimeout);
//
//   function makeTestCaseWith(numberOfAExprs, numberOfCallbacksPerAExpr) {
//     let items;
//
//     perfTest(it, `${numberOfAExprs} aexprs, ${numberOfCallbacksPerAExpr} cbs`, {
//       setupRun() {
//         let arrayLength = 1000;
//         items = getRandomArrayOfLength(arrayLength);
//
//         let indexGenerator = rand.create('aexprIndexGenerator');
//         times(numberOfAExprs, () => {
//           let aexprIndex = indexGenerator.range(arrayLength);
//           let listener = aexpr(() => items[aexprIndex]);
//           times(numberOfCallbacksPerAExpr, () => listener.onChange(() => {}));
//         });
//       },
//       run() {
//         quickSort(items);
//       },
//       teardownRun() {
//         reset();
//       }
//     });
//   }
//
//   numberOfAExprs.forEach(aexprs => {
//     callbacksPerAExpr.forEach(callbacks => {
//       makeTestCaseWith(aexprs, callbacks)
//     });
//   });
// });
