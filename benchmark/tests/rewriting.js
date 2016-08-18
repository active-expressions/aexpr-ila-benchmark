import perfTest from '../perf_test.js';
import rand from 'random-seed';

console.log(rand);

var foo = rand.create(42);
var bar = rand.create(42);
for(let i = 0; i < 1001; i++) {
  console.log(foo.random() === bar.random());
}

describe('Interpretation Benchmarks', function() {
  this.timeout("2000s");

  describe("Run", function() {

    function area() {
      return this.width * this.height;
    }

    beforeEach(() => {
      console.log(arguments);
    });

    it("Changing Rectangles", perfTest(function () {
      var count = 10;

      var rects = [];
      for(let i = 0; i < count; i++) {
        rects.push({
          width: i,
          height: 10,
          area
        });
      }

      for(let i = 0; i < count; i++) {
        aexprInterpretation(function() { return rects[i].area() }, {rects, i});
      }

      for(let i = 0; i < count; i++) {
        rects[i].width += 1;
        expect(rects[i].area()).to.be.greaterThan(0);
      }
    }));
  });
});
