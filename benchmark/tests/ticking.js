import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import { aexprTicking, checkTicking } from 'active-expressions';

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

describe('AExpr Construction', function() {
  this.timeout("2000s");

  describe("Same Object", function() {

    let rect = createRectangle(20, 10);

    it("Ticking", perfTest({
      run() {
        aexprTicking(() => rect.aspectRatio());
      }
    }));
  });

  describe("Different Object", function() {

    let rect;

    it("Ticking", perfTest({
      setupRun() {
        rect = createRectangle(20, 10);
      },
      run() {
        aexprTicking(() => rect.aspectRatio());
      }
    }));
  });
});

