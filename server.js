var request = require('request');
var express = require('express');
var router = express.Router();
var app = express();
var resStatus = false;
var baseURL = 'http://music.163.com/api';
var baseMp3URL = 'http://m2.music.126.net';
var resData;
var md5 = require('./build/md5');
var port = 9001;
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
app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})
