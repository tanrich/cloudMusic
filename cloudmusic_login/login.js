var express = require('express');
var crypto = require('./Crypto');
var request = require('superagent');
// var fm = require('./FileManager');
var app = new express();
app.use(express.static('./dist'))
app.listen(8081, function (err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('running at localhost:8081');
});

var header = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip,deflate,sdch',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'music.163.com',
    'Referer': 'http://music.163.com/',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36'
}
var id = '18523050246';
var pw = 'tan817230';
var baseUrl = 'http://music.163.com/weapi/login/cellphone';

var body = {
	phone: id,
	password: crypto.MD5(pw),
	rememberLogin: 'true'
}
var cookie;
body = crypto.aesRsaEncrypt(JSON.stringify(body));
var ret = request.post(baseUrl).send(body);
if (cookie) {
	ret.set('Cookie', cookie);
}
ret.set(header).timeout(10000).end(callback)


function callback (err, res) {
	if (err) {
		console.log(err);
		return;
	}
	var data = JSON.parse(res.text);
	console.log('登陆' + data.code)
	cookie = res.header['set-cookie'];
	console.log(data)
	console.log(cookie)
	list(cookie)
}

function list (cookie) {
	var uid = /\d+/.exec(cookie[2]);
	uid = uid ? uid[0] : null;
	if (!uid) {
        console.log({msg: '[userPlaylist]user do not login', type: 0});
        return;
    }
	var asin = {
		"offset": 0,
	    "limit": 10,
	    "uid": uid
	}
	asin = crypto.aesRsaEncrypt(JSON.stringify(asin));
	var reb = request.get('http://music.163.com/api/user/playlist/?offset=0&limit=10&uid=' + uid).send(asin);
	reb.set(header).timeout(1000).end(function (err, res) {
		var data = JSON.parse(res.text);
		console.log('歌单' + data.code)
	})
}

