import axios from 'axios'

let baseURL = '/Server';
const request = axios.create({
  baseURL: baseURL
});
export default {
  // 获取默认歌单
  getDefaultSongList: () => request.get('/defaultSongList')
}
