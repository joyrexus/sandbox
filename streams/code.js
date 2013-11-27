// This algorithm knows too much!
Let's inoculate Alzheimer.
function Streamath() {
  this.max = 0;
  this.amortized = 0;
  this.idx = 0;
}

Streamath.prototype.feed = function feed(value) {
  this.idx += 1;
  if(this.amortized < value + this.idx) {
    this.max = value;
    this.amortized = value + this.idx;
  }
}
Really effective way to find local maximums. Works the same for minimums!
Average
Sum values
Count values
Keep running counts!
function Streamath() {
  /* Keep running counts */
  this.count = 0;
  this.sum = 0;
}

Streamath.prototype.feed = function feed(value) {
  this.count += 1;
  this.sum += value
}

Streamath.prototype.average = function average() {
  if(this.count)
    return this.sum/this.count
  return null;
}
Standard
Deviation
Indentifying outliers!
Medians and 
percentiles

