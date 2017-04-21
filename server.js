let request = require('request');
let express = require('express')
let app = new express();
let router = express.Router();
let resStatus = false;
let baseURL = 'http://music.163.com/api';
let baseMp3URL = 'http://m2.music.126.net';
let baseCommentsURL = 'http://music.163.com/api/v1/resource/comments';
let resData;
let md5 = require('./build/md5');
let port = 9001
// request请求options
let options = {
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
  let time = setInterval(function () {
    // 默认情况下等待request请求数据完毕，服务端才开始返回
    if (resStatus) {
      clearInterval(time);
      resStatus = false;
      res.send(resData);
      res.end();
    }
  }, 100)
}

/**
 * 请求默认歌单
 * 示例：http://music.163.com/api/playlist/detail?id=616445224
 */
router.get('/defaultSongList', function (req, res) {
  let url = baseURL + '/playlist/detail?id=616445224';
  let copyOptions = clone(options);
  copyOptions.url = url;
  request(copyOptions, callback);
  sendData(req, res);
});

/**
 * 请求歌曲评论信息
 * 示例：http://music.163.com/api/v1/resource/comments/R_SO_4_185627/?rid=R_SO_4_185627&offset=0&total=false&limit=10
 */
router.get('/musicComments', function (req, res) {
  req = req.query;
  let string = '/R_SO_4_' + req.musicId;
  let offset = req.offset;
  let url = baseCommentsURL + string + '/?rid=' + string + 'offset=' + offset + '&total=false&limit=10';
  let copyOptions = clone(options);
  copyOptions.url = url;
  request(copyOptions, callback);
  sendData(req, res);
});

/**
 * 音乐资源进行md5解码
 * @param result 返回的结果函数
 * @param Music 传入包含dfsId码对象(其dfsId类型为Number)
 * @param name 传入的音质名称(hMusic,mMusic,lMusic)
 * 例子如下
 */
function decodeMusic(result, Music, name) {
  let dfsId = JSON.parse(Music).dfsId.toString();
  let md5dfsId = md5(dfsId);
  let url = baseMp3URL + '/' + md5dfsId + '/' + dfsId + '.mp3';
  result.push({
    [name]: url
  });
}

// 请求歌曲资源
router.get('/musicSource', function (req, res) {
  let data = req.query,
    hMusic = data.hMusic,
    mMusic = data.mMusic,
    lMusic = data.lMusic,
    result = [],
    sendNum = 0;
  if (hMusic) {
    sendNum++;
    decodeMusic(result, hMusic, 'hMusic');
  }
  if (mMusic) {
    sendNum++;
    decodeMusic(result, mMusic, 'mMusic');
  }
  if (lMusic) {
    sendNum++;
    decodeMusic(result, lMusic, 'lMusic');
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
  console.log('server running at 9001')
})
