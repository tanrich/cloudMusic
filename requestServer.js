/**
 * @file
 * @author tanruiqi@baidu.com
 */


(function () {
  let express = require('express');
  let request = require('request');
  let request_promise = require('request-promise');
  let app = express();
  let router = express.Router();
  let baseURL = 'http://music.163.com/api';
  let baseMp3URL = 'http://m2.music.126.net';
  let baseCommentsURL = 'http://music.163.com/api/v1/resource/comments';
  let md5 = require('./build/md5.js');

  let headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip,deflate,sdch',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'music.163.com',
    'Referer': 'http://music.163.com/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
  };
  // request请求options
  let options = {
    url: "",
    method: "GET",
    json: true
  };

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


  /**
   * 请求user歌单列表
   * 示例: http://music.163.com/api/user/playlist/?offset=0&limit=10&uid=79094369
   */
  router.get('/songListMenu', function (req, res) {
    let url = baseURL + '/user/playlist/?offset=0&limit=100&uid=79094369';
    let copyOptions = Object.assign({}, options, {url: url});
    request_promise(copyOptions).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      // console.log(err);
    })
  });

  /**
   * 请求默认歌单
   * 示例：http://music.163.com/api/playlist/detail?id=616445224
   */
  router.get('/defaultSongList', function (req, res) {
    let url = baseURL + '/playlist/detail?id=' + req.query.id;
    let copyOptions = Object.assign({}, options, {url: url});
    request_promise(copyOptions).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      console.log(err);
    })
  });

  /**
   * 请求歌曲评论信息
   * 示例：http://music.163.com/api/v1/resource/comments/R_SO_4_185627/?rid=R_SO_4_185627&offset=0&total=false&limit=10
   */
  router.get('/musicComments', function (req, res) {
    req = req.query;
    let string = '/R_SO_4_' + req.musicId;
    let offset = req.offset;
    let url = baseCommentsURL + string + '/?rid=' + string + '&offset=' + offset + '&total=false&limit=10';
    let copyOptions = Object.assign({}, options, {url: url});
    request_promise(copyOptions).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      console.log(err);
    })
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
    }, 10);
  });


  app.use('/Server', router)

})();
