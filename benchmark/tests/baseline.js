import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import quickSort from './deps/quicksort.js';

import { mochaTimeout, aspectRatioCount, targetAspectRatio } from './params.js';

/*
describe("Maintain Aspect Ratio", function() {
  this.timeout(mochaTimeout);

  let aspectRatioRand = rand.create('aspectRatio');
  let randomWidths;
  let rect;

  it("Baseline", perfTest({
    setupRun() {
      rect = createRectangle(20, 10);
      randomWidths = [];
      for(let i = 0; i < aspectRatioCount; i++) {
        randomWidths.push(aspectRatioRand.random());
      }
    },
    run() {
      randomWidths.forEach(val => {
        rect.width = val;
        rect.height = rect.width / targetAspectRatio;
        expect(rect.aspectRatio()).to.equal(targetAspectRatio);
      });
    }
  }));
});

// TODO: remove duplicate with rewriting
describe("Rewriting Transformation Impact", function() {
  this.timeout(mochaTimeout);

  let quickSortRand = rand.create('quickSort'),
      items;

  it("Baseline", perfTest({
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
*/