import perfTest from '../perf_test.js';
import rand from 'random-seed';
import { createRectangle } from './fixture.js';

import quickSort from './deps/quicksort.js';

import { mochaTimeout, aspectRatioCount, targetAspectRatio, rewritingImpactArraySize } from './params.js';

// describe("Maintain Aspect Ratio", function() {
//   this.timeout(mochaTimeout);
//
//   let aspectRatioRand = rand.create('aspectRatio');
//   let randomWidths;
//   let rect;
//
//   perfTest(it, "Baseline", {
//     setupRun() {
//       rect = createRectangle(20, 10);
//       randomWidths = [];
//       for(let i = 0; i < aspectRatioCount; i++) {
//         randomWidths.push(aspectRatioRand.random());
//       }
//     },
//     run() {
//       randomWidths.forEach(val => {
//         rect.width = val;
//         rect.height = rect.width / targetAspectRatio;
//         expect(rect.aspectRatio()).to.equal(targetAspectRatio);
//       });
//     }
//   });
// });
//
// // TODO: remove duplicate with rewriting
// describe("Rewriting Transformation Impact", function() {
//   this.timeout(mochaTimeout);
//
//   let quickSortRand = rand.create('quickSort'),
//       items;
//
//   perfTest(it, "Baseline", {
//     setupRun() {
//       items = [];
//       for(let i = 0; i < rewritingImpactArraySize; i++) {
//         items.push(quickSortRand.random());
//       }
//     },
//     run() {
//       quickSort(items);
//     }
//   });
// });

import { Layer, implicitLayers, resetLayerStack } from '../../ila/plain/src/Layers.js';
import { Context, Adaptee } from './fixture.js';

function resetLayers(layers) {
    layers.forEach(layer => layer.uninstall());
    layers.length = 0;
    implicitLayers.length = 0;
    resetLayerStack();
}

describe("Overhead for Initial Association", function() {
    this.timeout(mochaTimeout);

    let bool = false;
    let layers = [];

    perfTest(it, "Imperative Implementation", {
        setupRun() {
            layers.length = 0;
            for(let i = 0; i < 100; i++) {
                layers.push(new Layer());
            }
        },
        run() {
            layers.forEach(layer => {
                layer.activeWhile(() => bool)
            });
        },
        teardownRun() {
            resetLayers(layers);
        }
    });
});

describe("Frequent Context Change", function() {
    this.timeout(mochaTimeout);

    let context, adaptee, layer;
    perfTest(it, "Imperative Implementation", {
        setupRun() {
            context = new Context();
            adaptee = new Adaptee();
            layer = new Layer()
                .refineObject(adaptee, {
                    call() {
                        return 42;
                    }
                })
                .activeWhile(() => context.enabled());
        },
        run() {
            for(let i = 0; i < 10; i++) {
                for(let j = 0; j < 500; j++) {
                    context.disable();
                    context.enable();
                }
                expect(adaptee.call()).to.equal(42);
            }
        },
        teardownRun() {
            resetLayers([layer]);
        }
    });
});

describe("Frequent Message Sends", function() {
    this.timeout(mochaTimeout);

    let context, adaptee, layer;
    perfTest(it, "Imperative Implementation", {
        setupRun() {
            context = new Context();
            adaptee = new Adaptee();
            layer = new Layer()
                .refineObject(adaptee, {
                    call() {
                        return 42;
                    }
                })
                .activeWhile(() => context.enabled());
        },
        run() {
            for(let i = 0; i < 5; i++) {
                context.enable();
                for(let j = 0; j < 1000; j++) {
                    expect(adaptee.call()).to.equal(42);
                }
                context.disable();
                for(let j = 0; j < 1000; j++) {
                    expect(adaptee.call()).to.equal(-1);
                }
            }
        },
        teardownRun() {
            resetLayers([layer]);
        }
    });
});

describe("Multiple Layers with Frequent Message Sends", function() {
    this.timeout(mochaTimeout);

    let contexts = [], adaptee;
    let layers = [];

    perfTest(it, "Xmperative Implementation", {
        setupRun() {
            let numberOfLayers = 1000;

            adaptee = new Adaptee();
            layers.length = 0;
            for(let i = 0; i < numberOfLayers; i++) {
                (index => {
                    let context = new Context();
                    let layer = new Layer()
                        .refineObject(adaptee, {
                            call() {
                                return index;
                            }
                        })
                        .activeWhile(() => context.enabled());

                    contexts.push(context);
                    layers.push(layer);
                })(i);
            }
        },
        run() {
            for(let i = 0; i < 1; i++) {
                contexts.forEach((context, index) => {
                    context.enable();
                    for(let j = 0; j < 10; j++) {
                        expect(adaptee.call()).not.to.equal(-100);
                    }
                });
                contexts.reverse().forEach((context, index) => {
                    context.disable();
                    for(let j = 0; j < 10; j++) {
                        expect(adaptee.call()).not.to.equal(-100);
                    }
                });
            }
        },
        teardownRun() {
            resetLayers(layers);
        }
    });
});
