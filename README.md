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
4. 下载功能 3.14
5. 下一首，上一首 3.15


### 短期实现的目标

2. 音量调节功能
3. 显示评论功能
4. <span style='text-decoration:line-through'>下一首，上一首
5. <span style='text-decoration:line-through'>play-bar完善

### 问题

1. <span style='text-decoration:line-through'> 破解各类品质音乐会不定时出现404，初步没有解决办法，只能设定自动切换 3.11 
2. <span style='text-decoration:line-through'>本来mp3url 404放在后台检测的，但是后台延迟非常大，单个url延迟在4~6s不等，所以今天重写，把检测放在前端，效果初步满意，在1s之内。3.13
3. <span style='text-decoration:line-through'>兼容移动端界面问题 3.16
4. pc端浏览器`<audio>`表现一致，有资源自动加载。移动端浏览器表现怪异，或自动加载，或不自动加载。chrome（2个版本），UC，小米浏览器均表现不一致。目前以pc为主，后期修复这个bug 3.17


## LISENCE
[MIT](https://opensource.org/licenses/MIT)

本项目仅供学习交流