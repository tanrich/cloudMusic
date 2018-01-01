/**
 * @file
 * @author tanrich@foxmail.com
 */

// 函数防抖
export function debounce(fn, time = 500) {
  let wait = false;
  // 我太菜，写这段代码的时候才知道箭头函数不暴露arguments, 为undefined
  return function () {
    if (wait) return;
    wait = true;
    setTimeout(() => {
      fn.apply(this, arguments);
      wait = false;
    }, time);
  }
}

// 函数节流
export function throttle(fn, time = 500) {
  let wait = false;
  let code;
  return function () {
    if (wait) {
      clearTimeout(code);
    }
    wait = true;
    code = setTimeout(() => {
      fn.apply(this, arguments);
      wait = false;
    }, 500);
  }
}
