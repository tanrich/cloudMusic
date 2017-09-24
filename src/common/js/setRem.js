/**
 * @file
 * @author tanruiqi@baidu.com
 */

export default function () {
  // 设置rem基准值
  let html = document.documentElement;
  let timer = null;

  function setRem() {
    let width = html.getBoundingClientRect().width;
    // 真实尺寸除以200
    let rem = width / 3.75;
    window.rem = rem;
    html.style.fontSize = rem + 'px';
  }

  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(setRem, 300);
  }, false);

  window.resize = function () {
    if (document.createEvent) {
      let evt = document.createEvent('HTMLEvents');
      evt.initEvent('resize', true, true);
      window.dispatchEvent(evt);
    } else if (document.createEventObject) {
      window.fireEvent('onresize');
    }
  };

  setRem();
};
