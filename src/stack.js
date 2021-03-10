function Stack() {
  var items = [];
  this.push = function (item) {
    items.push(item);
  };

  this.pop = function () {
    return items.pop();
  };

  this.top = function () {
    return items[items.length - 1];
  };

  this.isEmpty = function () {
    return items.length == 0;
  };

  this.size = function () {
    return items.length;
  };

  this.clear = function () {
    items = [];
  };
}

//
function is_leagl_breakets(string) {
  var stack = new Stack();
  for (var i = 0; i < string.length; i++) {
    var item = string[i];
    if (item == "(") {
      stack.push(item);
    } else if (item == ")") {
      if (stack.isEmpty()) {
        return false;
      } else {
        stack.pop();
      }
    }
  }
  return stack.isEmpty();
}

console.log(is_leagl_breakets("sdf(ds(ew(we)rw)rwqq)qwewe"));
console.log(is_leagl_breakets("(sd(qwqw)sd(sd))"));
console.log(is_leagl_breakets("()()sd()(sd()fw))("));

// 计算后缀表达式
function calc_exp(exp) {
  var stack = new Stack();
  for (let i = 0; i < exp.length; i++) {
    var item = exp[i];
    if (["+", "-", "*", "/"].indexOf(item) >= 0) {
      var value1 = stack.pop();
      var value2 = stack.pop();
      var exp_str = value2 + item + value1;
      var res = parseInt(eval(exp_str));
      stack.push(res.toString());
    } else {
      stack.push(item);
    }
  }
  return stack.pop();
}

var exp_1 = ["4", "13", "5", "/", "+"];
console.log(calc_exp(exp_1));
var exp_2 = [
  "10",
  "6",
  "9",
  "3",
  "+",
  "-11",
  "*",
  "/",
  "*",
  "17",
  "+",
  "5",
  "+",
];
console.log(calc_exp(exp_2));

//
function MinStack() {
  var data_stack = new Stack();
  var min_stack = new Stack();
  this.push = function (item) {
    data_stack.push(item);
    if (min_stack.isEmpty() || item < min_stack.top()) {
      min_stack.push(item);
    } else {
      min_stack.push(min_stack.top());
    }
    this.pop = function () {
      data_stack.pop();
      min_stack.pop();
    };
    this.min = function () {
      return min_stack.top();
    };
  };
}

