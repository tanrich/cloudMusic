# music

> 仿网易云音乐

## Build Setup

``` bash
# 安装依赖
npm install

# localhost:8080 热加载服务器
npm run dev

# 上线打包
npm run build

# 上线打包分析报告
npm run build --report
```

### 说明
打算仿制一个手机端的网易云音乐。前端用Vue全家桶实现，后端决定使用nodejs转发解决跨域的问题。

### 进度

1. 实现了指定歌单的加载 3.05
2. 基本的播放，暂停，歌曲拉动，打碟旋转动画 3.09
3. 对于高音质音乐的破解 3.11


### 短期实现的目标

1. 下载功能
2. 音量调节功能
3. 显示评论功能
4. 下一首，上一首
5. play-bar完善

### 问题

1. 破解各类品质音乐会不定时出现404，初步没有解决办法，只能设定自动切换

## LISENCE
[MIT](https://opensource.org/licenses/MIT)

本项目仅供学习交流