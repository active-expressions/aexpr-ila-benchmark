export let mochaTimeout = 0;
export let aspectRatioCount = window.TRAVIS_CI ? 10000 : 100000;
export const targetAspectRatio = 2;

export let numberOfAExprsToCreate = window.TRAVIS_CI ? 100 : 1000; // should introduce flag regarding travis environment or not
