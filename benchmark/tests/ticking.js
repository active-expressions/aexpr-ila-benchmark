import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import { aexprTicking, checkTicking } from 'active-expressions';

describe('Ticking Benchmarks', function() {
  this.timeout("2000s");

  describe("Run", function() {

    let aspectRatioCount = 1000;
    const targetAspectRatio = 2;
    let aspectRatioRand = rand.create('aspectRatio');

    it("Maintain Aspect Ratio", perfTest(function () {
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
});