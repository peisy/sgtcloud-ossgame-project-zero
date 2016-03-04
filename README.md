# 使用声明

本软件已经取得软件著作权，受到相关法律条例的保护，在未获得合法授权的情况下请勿私自用于任何用途。

# 如何获得授权

### 个人开发者

* 联系我们，把您的产品基本信息（含产品名称，介绍，截图或者视频，上线地址，联系方式等）通过邮件或者其他方式发送给我们
* 在产品的启动页面上加上我们的[标识素材](http://pan.baidu.com/s/1kTXefyR)
* 无论您的产品收益如何，我们都不收取任何费用

### 企业开发者

* 联系我们，把您的产品基本信息（含产品名称，介绍，截图或者视频，上线地址，联系方式等）通过邮件或者其他方式发送给我们
* 提供贵公司的基本信息，并且签署一份软件授权使用协议，该协议是完全免费的
* 无论您的产品收益如何，我们都不收取任何费用

获得合法授权之后，我们会提供7X24的邮件技术支持和工作时间的全方位开发支持。

邮件联系：sgtcloud@yoedge.com
qq群：383461219

# 点击放置类开源游戏项目

### 产品设计文档

[在线文档地址](https://www.gitbook.com/book/sgtcloud/project-nova-0-doc/details)

### 在线演示

[点击打开](http://h5dev.yoedge.com/ossgame/publish/html5/index.html)

或者扫描二维码

![barcode](http://h5.yoedge.com/barcode.png)

### 开发环境和工具列表

* Cocos Framework(>=3.10)+Cocos Studio [下载](http://www.cocos.com/download/#)
* [xls2json](https://github.com/sgtcloud/xlsx2json)
* [shoebox](http://renderhjs.net/shoebox/)
* Webstorm或者sublime text或者其他的代码编辑器

### 获取代码

本项目托管在github上，安装[git](https://git-scm.com/)之后运行
    git clone https://github.com/sgtcloud/sgtcloud-ossgame-project-zero.git


### 项目目录

在cocos2d-js默认项目布局上新增加了若干目录，包含了webstorm的项目配置，可以直接导入webstorm。

```
├── doc/    #游戏文档
├── gfx/    #游戏图形素材
├── sfx/    #游戏声音素材
├── data/   #游戏数据素材
├── frameworks/    #cocos引擎文件
├── res/    #游戏资源
├── src/    #游戏源代码
├── lib/    #游戏依赖的三方js库
├── index.html  #游戏入口页面
├── main.js     #cocos引擎入口文件
├── README.md   #项目说明
├── ...     #其他cocos项目文件
```

##### gfx

包含所有设计文档所述的原始图片素材，例如psd/png/jpg/tga等，和cocos studio制作的ui和精灵工程文件，例如ccs/cbs等。详细的介绍请看目录下的README.md。

```
├── stage/          #战斗场景
├── character/      #角色精灵
├── enemy/          #敌人精灵
├── effect/         #游戏特效
├── icon/           #图标文件
├── title/          #标题界面
├── loading/        #加载界面
├── ui/             #ui资源
|   ├──charactUI/   #角色界面
|   ├──itemUI/      #物品界面
|   ├──skillUI/     #技能界面
|   ├──arenaUI/     #竞技场界面
|   ├──rankUI/      #排行界面
|   ├──shopUI/      #商店界面
|   ├──...          #其他界面
├── README.md       #图片资源使用说明
```

##### sfx

包含所有未经剪辑的声音素材，例如mp3/wav/ogg等。详细的介绍请看目录下的README.md。

##### data

包含所有设计文档所述的数据源文件，例如xls/csv等。详细的介绍请看目录下的README.md。

##### lib

包含因为一些原因在index中引入的例如jquery或者特定用途（例如统计分析）的本地js库文件。

### 项目构建和发布

##### Cocos Console

项目可以直接通过cocos的构建工具进行项目的构建（build）和发布（release）。直接使用命令行cocos compile -p web -m release即可发布，暂时不支持--advanced参数

##### gulp

构建的时候还考虑到了多渠道发布的需求，所以同时提供了[gulp](http://gulpjs.com/)实现的工具链。
首先确认自己安装了[Nodejs](http://nodejs.org/)环境。

* 运行
    npm install --save-dev gulp del gulp-cache gulp-concat gulp-debug gulp-image gulp-json-editor gulp-replace gulp-sourcemaps gulp-uglify vinyl-buffer vinyl-source-stream
    安装需要的软件

* 运行
    gulp
    在public/html5下面构建出和cocos一致的发布

使用gulp的构建脚本可以非常容易的定制自己的发布，我们已经加入了发布参数的预处理和资源的压缩（详见根目录的gulpfile.js），我们建议您使用这种方式。


### 项目源代码导读

* 本游戏主要采用了cocos studio作为界面设计工具，加载导出的json文件来完成绝大部分的UI界面工作，例如CCSUnit
* 本游戏参考了mvvm的软件架构模式，分离了model和view model两级模型，例如，Hero和HeroUnit
* 本游戏采用了事件驱动的方式来解耦各个程序逻辑模块，例如Event
* 本游戏通过sgtcloud提供的baas服务来实现联网逻辑，详见[sgtcloud](http://www.sgtcloud.cn)

##### 根目录

* main.js 程序入口类
* apps.js 程序通用工具类
* Chance.js 随机数工具类
* GamePopup.js 弹窗类
* MainScene.js 构造和初始化主场景所有界面
* LoaderScene.js 首屏加载类，重写了加载逻辑，支持ccs导出的动画和控件作为内容
* Event.js 自定义事件类和工具方法
* Data.js 数据读取工具方法类

##### 数据模型

model目录中的大部分类都是通过加载data目录下的只读数据文件（*.json）和部分存档数据（Player.js中的player）构造出来的逻辑实体

##### 核心战斗模块

battle目录中包含了组成核心战斗场景的各个view model

* 精灵层级和继承关系（从右向左）
![关系图](http://h5.yoedge.com/BattleField.png)

##### 联网功能依赖

游戏的联网相关功能，包含不限于在线存档，服务器时间校准，签到，排行榜等等功能，都是由[sgtcloud](http://www.sgtcloud.cn/)提供的[sgtcloud-html5-sdk](https://github.com/sgtcloud/sgtcloud-html5-sdk)，自行调试和进行二次开发的时候请务必申请自己的appid参数。

### 项目路线图

下一个发布版本为[0.0.5](https://github.com/sgtcloud/sgtcloud-ossgame-project-zero/milestones/0.0.5)

##### 其他待完成开发任务

* 实现首次加载资源的优化
* 实现基于cocos studio导出控件的事件绑定
* 剥离界面和逻辑的耦合，提升代码的抽象级别

欢迎开发者给我们提出你们开发中遇到的问题，有问必答，有求必应：）

# 鸣谢

* [cocos](http://cocos.com/)商标和产品相关权利归触控所有，感谢触控为我们带来免费开源的游戏引擎，也感谢开发团队对我们的无私支持