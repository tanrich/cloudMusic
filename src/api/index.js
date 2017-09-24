import axios from 'axios'

let baseURL = '/Server';
baseURL = 'http://localhost:3000';
const request = axios.create({
  baseURL: baseURL
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
  getSongListMenu: () => request.get('/user/playlist?uid=79094369'),
  getDefaultSongList: (params) => request.get('/playlist/detail', {params}),
  getMusicSource: (params) => request.get('/music/url', {params}),
  getMusicComments: (params) => request.get('/comment/music', {params})
}
