require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express();

/**
 * cloudMusic
 */




(function () {
  var request = require('request');
  var router = express.Router();
  var resStatus = false;
  var baseURL = 'http://music.163.com/api';
  var baseMp3URL = 'http://m2.music.126.net';
  var resData;
  var md5 = require('./md5');
  // request请求options
  var options = {
    headers: {"Connection": "close"},
    url: "",
    method: "GET",
    json: true
  };

  // request请求回调函数
  function callback(error, res, data) {
    if (!error && res.statusCode == 200) {
      resData = data;
      resStatus = true;
    }
  }

  // 深度克隆
  function clone(obj) {
    let tmp;
    if (obj instanceof Array) {
      tmp = [];
      let len = obj.length;
      for (let i = 0; i < len; i++) {
        tmp[i] = clone(obj[i]);
      }
      return tmp;
    } else if (obj instanceof Object) {
      tmp = {};
      for (let k in obj) {
        tmp[k] = clone(obj[k]);
      }
      return tmp;
    } else {
      return obj;
    }
  }

  // 服务端返回数据
  function sendData(req, res) {
    var time = setInterval(function () {
      // 默认情况下等待request请求数据完毕，服务端才开始返回
      if (resStatus) {
        clearInterval(time);
        resStatus = false;
        res.send(resData);
        res.end();
      }
    }, 100)
  }

  // 请求默认歌单
  router.get('/defaultSongList', function (req, res) {
    var url = baseURL + '/playlist/detail?id=616445224';
    var copyOptions = clone(options);
    copyOptions.url = url;
    request(copyOptions, callback);
    sendData(req, res);
  });

  /**
   * 向网易云请求音乐资源
   * @param result 返回的结果函数
   * @param Music 传入的dfsId码(类型Number)
   * @param name 传入的音质名称(hMusic,mMusic,lMusic)
   * 例子如下
   */
  function getMusic(result, Music, name) {
    let dfsId = JSON.parse(Music).dfsId.toString();
    let md5dfsId = md5(dfsId);
    let url = baseMp3URL + '/' + md5dfsId + '/' + dfsId + '.mp3';
    result.push({
      [name]: url
    });
  }

  // 请求歌曲资源
  router.get('/musicSource', function (req, res) {
    var data = req.query,
      hMusic = data.hMusic,
      mMusic = data.mMusic,
      lMusic = data.lMusic,
      result = [],
      sendNum = 0;
    if (hMusic) {
      sendNum++;
      getMusic(result, hMusic, 'hMusic');
    }
    if (mMusic) {
      sendNum++;
      getMusic(result, mMusic, 'mMusic');
    }
    if (lMusic) {
      sendNum++;
      getMusic(result, lMusic, 'lMusic');
    }
    // 设置延迟执行函数，等待网易api数据全部返回
    let wait = setInterval(() => {
      // 当发送请求数===结果返回数时返回result
      if (sendNum === result.length) {
        clearInterval(wait);
        res.send(result);
        res.end();
      }
    }, 100);
  });

  app.use('/Server', router)

})();


/**
 * cloudMusic
 */



var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
