import perfTest from '../perf_test.js';
import { times } from './test-utils';
import rand from 'random-seed';

import { createRectangle } from './fixture.js';

import { aexprTicking, checkTicking } from 'active-expressions';

describe('AExpr Construction', function() {
  this.timeout("2000s");

  let num = 1000;

  describe("Same Object", function() {

    let rect = createRectangle(20, 10);

    it("Ticking", perfTest({
      run() {
        for(let i = 0; i < num; i++) {
          aexprTicking(() => rect.aspectRatio());
        }
      }
    }));
  });

  describe("Different Object", function() {
    let rects;

    it("Ticking", perfTest({
      setupRun() {
        rects = [];
        times(num, () => rects.push(createRectangle(20, 10)));
      },
      run() {
        for(let i = 0; i < num; i++) {
          let rect = rects[i];
          aexprTicking(() => rect.aspectRatio());
        }
      }
      // TODO: teardown: remove/reset old aexprs!
    }));
  });
});

describe("Maintain Aspect Ratio", function() {
  this.timeout("2000s");

  let aspectRatioCount = 1000;
  const targetAspectRatio = 2;
  let aspectRatioRand = rand.create('aspectRatio');

  it("Ticking", perfTest(function () {
    let rect = createRectangle(20, 10);
    let exp = aexprTicking(() => rect.aspectRatio())
        .onChange(ratio => rect.height = rect.width / targetAspectRatio);

    for(let i = 0; i < aspectRatioCount; i++) {
      rect.width = aspectRatioRand.random();
      checkTicking([exp]);
      expect(rect.aspectRatio()).to.equal(targetAspectRatio);
    }
  }));
});

