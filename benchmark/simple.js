// var loadZ3 = require("../z3/module.z3");
// var assert = require("assert");
// var perfTest = require("./perf_test");
import perfTest from './perf_test.js';
import Stack from 'stack-es2015-modules';
import { aexprTicking, aexprInterpretation } from 'active-expressions';

describe('Stack Benchmarks', function() {
  var c = null;
  this.timeout("200s");

  before(function(done){
    done();
  });

  describe("Run", function() {

    let stack = null;

    beforeEach(() => stack = new Stack());

    it("Solve nothing", perfTest(function () {
      stack.push(42);
      //aexprInterpretation(function() { return stack.arr[stack.arr.length-1] }, { stack }).onChange(top => console.log(top));
    }));

    it("Multiple Constraints", perfTest(function () {
      aexprTicking(() => { return 42}, {}).onChange(() => console.log());
      // var v1 = new c.Variable({ value: 0 });
      // var v2 = new c.Variable({ value: 0 });
      //
      // // v1 - 1 == v2
      // var e1 = c.minus(v1, 1);
      // var eq1 = new c.Equation(e1, v2);
      //
      // // v1 >= 2
      // var eq2 = new c.Inequality(v1, ">=", 2);
      //
      // var s1 = new c.SimplexSolver();
      // s1.addConstraint(eq1);
      // s1.addConstraint(eq2);
      // s1.solve();
      //
      // assert.ok(v1.value - 1 == v2.value);
      // assert.ok(v1.value >= 2);

    }));
  });
});
