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




// (function () {
//   let request = require('request');
//   let request_promise = require('request-promise');
//   let router = express.Router();
//   let baseURL = 'http://music.163.com/api';
//   let baseMp3URL = 'http://m2.music.126.net';
//   let baseCommentsURL = 'http://music.163.com/api/v1/resource/comments';
//   let md5 = require('./md5.js');
//
//   let headers = {
//     'Accept': '*/*',
//     'Accept-Encoding': 'gzip,deflate,sdch',
//     'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
//     'Connection': 'keep-alive',
//     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     'Host': 'music.163.com',
//     'Referer': 'http://music.163.com/',
//     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
//   };
//   // request请求options
//   let options = {
//     url: "",
//     method: "GET",
//     json: true
//   };
//
//   // 深度克隆
//   function clone(obj) {
//     let tmp;
//     if (obj instanceof Array) {
//       tmp = [];
//       let len = obj.length;
//       for (let i = 0; i < len; i++) {
//         tmp[i] = clone(obj[i]);
//       }
//       return tmp;
//     } else if (obj instanceof Object) {
//       tmp = {};
//       for (let k in obj) {
//         tmp[k] = clone(obj[k]);
//       }
//       return tmp;
//     } else {
//       return obj;
//     }
//   }
//
//
//   /**
//    * 请求user歌单列表
//    * 示例: http://music.163.com/api/user/playlist/?offset=0&limit=10&uid=79094369
//    */
//   router.get('/songListMenu', function (req, res) {
//     let url = baseURL + '/user/playlist/?offset=0&limit=100&uid=79094369';
//     let copyOptions = Object.assign({}, options, {url: url});
//     request_promise(copyOptions).then(function (data) {
//       res.send(data)
//     }).catch(function (err) {
//       // console.log(err);
//     })
//   });
//
//   /**
//    * 请求默认歌单
//    * 示例：http://music.163.com/api/playlist/detail?id=616445224
//    */
//   router.get('/defaultSongList', function (req, res) {
//     let url = baseURL + '/playlist/detail?id=' + req.query.id;
//     let copyOptions = Object.assign({}, options, {url: url});
//     request_promise(copyOptions).then(function (data) {
//       res.send(data)
//     }).catch(function (err) {
//       console.log(err);
//     })
//   });
//
//   /**
//    * 请求歌曲评论信息
//    * 示例：http://music.163.com/api/v1/resource/comments/R_SO_4_185627/?rid=R_SO_4_185627&offset=0&total=false&limit=10
//    */
//   router.get('/musicComments', function (req, res) {
//     req = req.query;
//     let string = '/R_SO_4_' + req.musicId;
//     let offset = req.offset;
//     let url = baseCommentsURL + string + '/?rid=' + string + '&offset=' + offset + '&total=false&limit=10';
//     let copyOptions = Object.assign({}, options, {url: url});
//     request_promise(copyOptions).then(function (data) {
//       res.send(data)
//     }).catch(function (err) {
//       console.log(err);
//     })
//   });
//
//   /**
//    * 音乐资源进行md5解码
//    * @param result 返回的结果函数
//    * @param Music 传入包含dfsId码对象(其dfsId类型为Number)
//    * @param name 传入的音质名称(hMusic,mMusic,lMusic)
//    * 例子如下
//    */
//   function decodeMusic(result, Music, name) {
//     let dfsId = JSON.parse(Music).dfsId.toString();
//     let md5dfsId = md5(dfsId);
//     let url = baseMp3URL + '/' + md5dfsId + '/' + dfsId + '.mp3';
//     result.push({
//       [name]: url
//     });
//   }
//
//   // 请求歌曲资源
//   router.get('/musicSource', function (req, res) {
//     let data = req.query,
//       hMusic = data.hMusic,
//       mMusic = data.mMusic,
//       lMusic = data.lMusic,
//       result = [],
//       sendNum = 0;
//     console.log(data)
//     if (hMusic) {
//       sendNum++;
//       decodeMusic(result, hMusic, 'hMusic');
//     }
//     if (mMusic) {
//       sendNum++;
//       decodeMusic(result, mMusic, 'mMusic');
//     }
//     if (lMusic) {
//       sendNum++;
//       decodeMusic(result, lMusic, 'lMusic');
//     }
//     // 设置延迟执行函数，等待网易api数据全部返回
//     let wait = setInterval(() => {
//       // 当发送请求数===结果返回数时返回result
//       if (sendNum === result.length) {
//         clearInterval(wait);
//         res.send(result);
//         res.end();
//       }
//     }, 10);
//   });
//
//
//   app.use('/Server', router)
//
// })();



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
