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
  // getSongListMenu: () => request.get('/user/playlist?uid=79094369'),
  getSongListMenu: () => localApi.get('/user/playlist'),
  // 获取默认歌单
  // getDefaultSongList: params => request.get('/playlist/detail', {params}),
  getDefaultSongList: params => localApi.get('playlist/detail', {params}),
  // 获取歌曲详情
  getSongInfo: params => request.get('/song/detail', {params}),
  // 获取歌曲资源
  getMusicSource: params => request.get('/music/url', {params}),
  // getMusicComments: params => request.get('/comment/music', {params}),
  // 获取歌曲评论
  getMusicComments: params => localApi.get('/comment/music', {params}),
  // 发送评论
  sendComment: body => localApi.post('/comment/publish', body),
  // 点赞&&取消评论
  commentLike: body => localApi.put('/comment/like', body),
  // 获取排行榜
  getRank: params => request.get('/top/list', {params}),
  // 注册
  register: body => localApi.post('/user/register', body),
  // 登陆
  login: params => localApi.get('/user/login', {params}),
  // 退出登录
  logout: () => localApi.put('/user/logout'),
  // 搜索
  search: params => request.get('/search', {params}),
  // 搜索预测
  searchSuggest: params => request.get('/search/suggest', {params}),
  // 收藏
  collect: body => localApi.put('/user/collect', body),
  // 获取歌词
  getLyric: params => request.get('/lyric', {params}),
}
