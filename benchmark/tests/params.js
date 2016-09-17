export let mochaTimeout = 0;

// aexpr construction
export let numberOfAExprsToCreate = window.TRAVIS_CI ? 100 : 1000; // should introduce flag regarding travis environment or not

// aexpr update
export let aspectRatioCount = window.TRAVIS_CI ? 10000 : 100000;
export const targetAspectRatio = 2;

// rewriting vs interpretation
export let numberOfAExprs = window.TRAVIS_CI ? [0,20,40,60,80,100] : [0,1,10,20,30,40,50,100,150,200,250, 300];//[1,2,4,8,16,32,64,128,256].reverse();
export let callbacksPerAExpr = [10];

export let rewritingImpactArraySize = 10000;