import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import quickSort from './deps/quicksort.js';

import { mochaTimeout, aspectRatioCount, targetAspectRatio, rewritingImpactArraySize } from './params.js';

describe("Maintain Aspect Ratio", function() {
  this.timeout(mochaTimeout);

  let aspectRatioRand = rand.create('aspectRatio');
  let randomWidths;
  let rect;

  perfTest(it, "Baseline", {
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
  });
});

// TODO: remove duplicate with rewriting
describe("Rewriting Transformation Impact", function() {
  this.timeout(mochaTimeout);

  let quickSortRand = rand.create('quickSort'),
      items;

  perfTest(it, "Baseline", {
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
