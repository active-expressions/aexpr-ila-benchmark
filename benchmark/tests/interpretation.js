import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import { aexprInterpretation } from 'active-expressions';

describe("Maintain Aspect Ratio", function () {
  this.timeout("2000s");

  let aspectRatioCount = 1000;
  const targetAspectRatio = 2;
  let aspectRatioRand = rand.create('aspectRatio');

  it("Interpretation", perfTest(function () {
    let rect = createRectangle(20, 10);
    aexprInterpretation(() => rect.aspectRatio(), {rect})
        .onChange(ratio => rect.height = rect.width / targetAspectRatio);

    for (let i = 0; i < aspectRatioCount; i++) {
      rect.width = aspectRatioRand.random();
      expect(rect.aspectRatio()).to.equal(targetAspectRatio);
    }
  }));
});

describe("Partially Wrapped", function() {
  this.timeout("2000s");

  let rects;

  for(let i = 0; i <= 10; i++) {
    it(`${i} of 10`, perfTest({
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
    }));
  }
});

describe('AExpr Construction', function() {
  this.timeout("2000s");

  describe("Same Object", function() {

    let rect = createRectangle(20, 10);

    it("Interpretation", perfTest({
      run() {
        aexprInterpretation(() => rect.aspectRatio(), locals);
      }
    }));
  });

  describe("Different Object", function() {

    let rect;

    it("Interpretation", perfTest({
      setupRun() {
        rect = createRectangle(20, 10);
      },
      run() {
        aexprInterpretation(() => rect.aspectRatio(), locals);
      }
    }));
  });
});

