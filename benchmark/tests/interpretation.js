import perfTest from '../perf_test.js';
import { times, getRandomArrayOfLength } from './test-utils.js';
import rand from 'random-seed';

import { createRectangle } from './fixture.js';
import quickSort from './deps/quicksort.js';

import { numberOfAExprsToCreate, mochaTimeout, aspectRatioCount, targetAspectRatio,
    numberOfAExprs,
    callbacksPerAExpr } from './params.js';

import { aexprInterpretation } from 'aexpr-interpretation';

describe('AExpr Construction', function() {
  this.timeout(mochaTimeout);

  describe("Same Object", function() {

    let rect = createRectangle(20, 10);

    perfTest(it, "Interpretation", {
      run() {
        for(let i = 0; i < numberOfAExprsToCreate; i++) {
          aexprInterpretation(() => rect.aspectRatio(), {rect});
        }
      }
    });
  });

  describe("Different Object", function() {

    let rects;

    perfTest(it, "Interpretation", {
      setupRun() {
        rects = [];
        times(numberOfAExprsToCreate, () => rects.push(createRectangle(20, 10)));
      },
      run() {
        for(let i = 0; i < numberOfAExprsToCreate; i++) {
          let rect = rects[i];
          aexprInterpretation(() => rect.aspectRatio(), {rect});
        }
      }
    });
  });
});

describe("Maintain Aspect Ratio", function () {
  this.timeout(mochaTimeout);

  let aspectRatioRand = rand.create('aspectRatio');
    let randomWidths;
    let rect;

  perfTest(it, "Interpretation", {
      setupRun() {
          rect = createRectangle(20, 10);
          aexprInterpretation(() => rect.aspectRatio(), {rect})
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
      }
  });
});

describe("Partially Wrapped", function() {
  this.timeout(mochaTimeout);

  let rects;

  for(let i = 0; i <= 10; i++) {
    perfTest(it, `${i} of 10`, {
      setupRun() {
        rects = [];
        for(let j = 0; j < 10; j++) {
          let rect = createRectangle(20, 10);

          if(j < i) {
            aexprInterpretation(() => rect.aspectRatio(), {rect});
          }

          rects[j] = rect;
        }
      },
      run() {
        for (let i = 0; i < 10000; i++) {
          for (let l = 0; l < 10; l++) {
            let r = rects[l];
            r.height -= r.width;
            r.width += r.height;
          }
        }
      }
    });
  }
});

// describe("AExpr and Callback Count (Interpretation)", function() {
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
//           let listener = aexprInterpretation(() => items[aexprIndex], locals);
//           times(numberOfCallbacksPerAExpr, () => listener.onChange(() => {}));
//         });
//       },
//       run() {
//         quickSort(items);
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
