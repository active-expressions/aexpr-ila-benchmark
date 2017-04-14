import perfTest from '../perf_test.js';
import { times } from './test-utils';
import rand from 'random-seed';

import { createRectangle } from './fixture.js';

import { numberOfAExprsToCreate, mochaTimeout, aspectRatioCount, targetAspectRatio } from './params.js';

import { aexprTicking, checkTicking, clearDefaultActiveExpressions } from 'aexpr-ticking';

describe('AExpr Construction', function() {
  this.timeout(mochaTimeout);

  describe("Different Object", function() {
    let rects;

    perfTest(it, "Ticking", {
      setupRun() {
        rects = [];
        times(numberOfAExprsToCreate, () => rects.push(createRectangle(20, 10)));
      },
      run() {
        for(let i = 0; i < numberOfAExprsToCreate; i++) {
          let rect = rects[i];
          aexprTicking(() => rect.aspectRatio());
        }
      },
      teardownRun() {
        clearDefaultActiveExpressions();
      }
      // TODO: teardown: remove/reset old aexprs!
    });
  });

  describe("Same Object", function() {

    let rect = createRectangle(20, 10);

    perfTest(it, "Ticking", {
      run() {
        for(let i = 0; i < numberOfAExprsToCreate; i++) {
          aexprTicking(() => rect.aspectRatio());
        }
      },
      teardownRun() {
        clearDefaultActiveExpressions();
      }
    });
  });
});

// describe("Maintain Aspect Ratio", function() {
//   this.timeout(mochaTimeout);
//
//   let aspectRatioRand = rand.create('aspectRatio');
//   let randomWidths;
//   let rect;
//   let exp;
//
//   perfTest(it, "Ticking", {
//     setupRun() {
//       rect = createRectangle(20, 10);
//       exp = aexprTicking(() => rect.aspectRatio())
//           .onChange(ratio => rect.height = rect.width / targetAspectRatio);
//       randomWidths = [];
//       for(let i = 0; i < aspectRatioCount; i++) {
//         randomWidths.push(aspectRatioRand.random());
//       }
//     },
//     run() {
//       randomWidths.forEach(val => {
//         rect.width = val;
//         checkTicking([exp]);
//         expect(rect.aspectRatio()).to.equal(targetAspectRatio);
//       });
//     }
//   });
// });

