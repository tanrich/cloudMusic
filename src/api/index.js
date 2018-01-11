import axios from 'axios'

const baseURL = `${window.location.protocol}//${window.location.hostname}:3000`;
const request = axios.create({
  baseURL
});

const localURL = `${window.location.protocol}//${window.location.hostname}:3001`;
const localApi = axios.create({
  baseURL: localURL,
  withCredentials: true
});
// export default {
//   getSongListMenu: () => request.get('/songListMenu'),
//   // 获取默认歌单
//   getDefaultSongList: (params) => request.get('/defaultSongList', {params}),
//   // 获取歌曲资源
//   getMusicSource: (params) => request.get('/musicSource', {params}),
//   // 获取歌曲评论
//   getMusicComments: (params) => request.get('/musicComments', {params})
// }

export default {
  // 79094369 1324447822
  getSongListMenu: () => request.get('/user/playlist?uid=79094369'),
  // 获取默认歌单
  getDefaultSongList: params => request.get('/playlist/detail', {params}),
  // 获取歌曲资源
  getMusicSource: params => request.get('/music/url', {params}),
  // 获取歌曲资源
  getMusicComments: params => request.get('/comment/music', {params}),
  // 获取歌曲评论
  getRank: params => request.get('/top/list', {params}),
  // 注册
  register: body => localApi.post('/user/register', body),
  // 登陆
  login: params => localApi.get('/user/login', {params}),
  // 退出登录
  logout: () => localApi.put('/user/logout')
}
