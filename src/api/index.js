import axios from 'axios'

let baseURL = '/Server';
const request = axios.create({
  baseURL: baseURL
});
export default {
  getSongListMenu: () => request.get('/songListMenu'),
  // 获取默认歌单
  getDefaultSongList: (params) => request.get('/defaultSongList', {params}),
  // 获取歌曲资源
  getMusicSource: (params) => request.get('/musicSource', {params}),
  // 获取歌曲评论
  getMusicComments: (params) => request.get('/musicComments', {params})
}
