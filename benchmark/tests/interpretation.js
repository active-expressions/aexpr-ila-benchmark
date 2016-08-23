import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import { aexprInterpretation } from 'active-expressions';

describe('Interpretation Benchmarks', function() {
  this.timeout("2000s");

  describe("Run", function() {

    let aspectRatioCount = 1000;
    const targetAspectRatio = 2;
    let aspectRatioRand = rand.create('aspectRatio');

    it("Maintain Aspect Ratio", perfTest(function () {
      let rect = createRectangle(20, 10);
      aexprInterpretation(() => rect.aspectRatio(), {rect})
          .onChange(ratio => rect.height = rect.width / targetAspectRatio);

      for(let i = 0; i < aspectRatioCount; i++) {
        rect.width = aspectRatioRand.random();
        expect(rect.aspectRatio()).to.equal(targetAspectRatio);
      }
    }));
  });

  describe("Run", function() {

    let rects;

    for(let i = 0; i <= 10; i++) {
      it(`Partially wrapped (${i} of 10)`, perfTest({
        setupRun() {
          rects = [];
          for(let j = 0; j < 10; j++) {
            let rect = createRectangle(20, 10);

            if(j < i) {
              console.log(`wrap rect (${j})`);
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
});
