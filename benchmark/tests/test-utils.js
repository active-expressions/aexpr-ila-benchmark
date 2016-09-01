import rand from 'random-seed';

export function times(max, cb) {
    for(let i = 0; i < max; i++) {
        cb(i);
    }
}

export function getRandomArrayOfLength(l, seed = 'seed') {
    let quickSortRand = rand.create(seed);

    let arr = [];
    for(let j = 0; j < l; j++) {
        arr.push(quickSortRand.random());
    }

    return arr;
}
