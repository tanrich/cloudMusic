# 请求说明

### 请求歌单
- baseURL: `http://music.163.com/api/playlist/detail`
- sendData: `?id=*`
- resData: 

		res = res.data;
		res.code 状态码;
		
		// 进入主数据
		data = res.result;
		{
			data.coverImgUrl 歌单封面图片
			data.trackCount 歌单包含歌曲数量
			data.name 歌单名称
		}
		
		creator = data.creator;
		{
			creator.avatarUrl 创建者头像
			creator.nickname 创建者昵称
			creator.signature 创建者个性签名
		}
		
		tracks = data.tracks;
		[
		  {
		    tracks[0].name 歌曲名称
		  }
		]
		
		artists = tracks[0].artists
		[
		  {
		    artists.name 歌手名称
		  }
		]
		
		album = tracks[0].album
		{
		  album.name 专辑名称
		  album.picUrl 专辑图片
		}
		
		hMuisc = track[0].hMusic
		{
		  hMuisc.dfsId 歌曲加密值
		  hMusic.playTime 歌曲播放时长
		  hMuisc.size 歌曲大小
		}
		同级还有mMuisc、lMusic、bMusic(默认)(同lMusic)
		