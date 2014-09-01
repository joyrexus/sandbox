function onetofive() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

console.log(onetofive());

/*
function* foo(x) {
    if (x == 1) {
        return 1;
    }
    else {
        yield foo(x-1);
    }
}

console.log(foo(1000));
*/
