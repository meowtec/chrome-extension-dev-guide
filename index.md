# Chrome 扩展开发入门到上架

https://github.com/meowtec



# 关于作者

多年前开始开发 Chrome 扩展，上架扩展有：

- [Owl-redirector](https://github.com/meowtec/Owl-redirector) 强大的请求重定向扩展
- [menufish](https://github.com/meowtec/chrome-menufish) 可自定义的右键搜索、分享扩展



# 什么是 Chrome 扩展

Chrome 扩展是指使用 JavaScript 等网页技术开发的，用来扩展 Chrome 功能的程序。



# 学会开发扩展的好处 

- 提高工作效率
- 网页内容自己做主
- 做简单的自动化操作



# 相关名词

## userscript

后缀为 `.user.js ` 的 js 文件，Chrome 会自动注入到指定页面内，用于修改页面内容。

- 开发非常简单，只需要一个 js 文件
- 功能单一，但仍可以满足大多数需求
- 内存占用比较低

## plugin(插件)

使用 Native 技术开发的，用于增强 Chrome 能力的程序。`chrome://plugins/`

类似 IE 上的 ActiveX。常见应用有 Flash、银行安全控件等。

- 使用 Native API 开发，开发难度高
- 发布成本较高




##  UserScript 结构

1. 文件以 `.user.js` 为后缀
2. 通过 `==UserScript==` 注释添加描述信息
3. 使用 `@match` 匹配 URL，可添加多行
4. 文件拖入 `chrome://extensions/` 进行安装



## UserScript 示例

UserScript 基本格式为：

```
// ==UserScript==
// @match          http://URL
// ==/UserScript==

console.log(1)
```

还可以使用这些字段:

 `@name` `@description` `@version` `@author`



##  课堂作业

使用 UserScript 把百度首页 Logo 上下颠倒



# 空 Chrome 扩展

1. 新建一个文件夹
2. 新建 manifest.json 配置文件. ([文档](https://developer.chrome.com/extensions/manifest))

```
{
  "manifest_version": 2,
  "name": "百度助手",
  "version": "0.0.1"
}
```




# Content script

`Content script` 是注入到指定网页的 JS 脚本。

```
"content_scripts": [
  {
    "matches": ["https://hostpath/*"],
    "css": ["content.css"],
    "js": ["content.js"]
  }
]
```



## 课堂作业


1. 上下颠倒百度 logo
2. `百度一下`改为`下一度百`



## Content script 特点

1. 完全的 DOM 访问能力
2. 执行环境隔离：不会影响页面变量，也不会被影响
3. 可以和访问部分 Chrome 扩展 API



## Content script 调试

和调试普通网页代码一样，我们使用 *Chrome Developer Tools* 进行调试。



## Content script 调试

进行如下操作：

1. 修改 `content.js`，添加 `window.testExtVar = 123;`
2. 打开开发者工具，直接在 **Console** 中执行 `console.log(window.testExtVar)` 

**结果是什么？为什么？**



# Content script 进阶

这是微博的截图：

![](http://ww4.sinaimg.cn/large/7dfcf2f7gw1f9w2ul3t0rj20g0050gm7.jpg)



# Content script 进阶

这是「2分钟前」的 HTML 结构:

```
<a title="2016-11-18 10:59"
  date="1479437943000"
  class="S_txt2" node-type="feed_list_item_date"
  >2分钟前</a>
```



# 作业

实现针对新浪微博发现（d.weibo.com） 的扩展，把 feed 流的时间格式都改成  yyyy-MM-dd HH:mm 形式。



# 思考

Feed 流内容是异步加载的，如何在异步加载后尽快对 DOM进行修改？



# MutationObserver

MutationObserver 属于标准 DOM API，用来观测 DOM 变动事件。

```javascript
observer = new MutationObserver(
  function callback
)
observer.observe(target, config)
```



# MutationObserver

使用 MutationObserver 监听 DOM，可以方便修改动态变化的元素。



# 拓展思考

如何通过只注入 css 的方式达成目的？



# Content script 用途

Content script 的应用**十分广泛**，各种优化网页内容，修改页面样式，添加 widget 工具的扩展都需要用到 `Content script`.

知名扩展如：

- 眼不见心不烦（新浪微博）
- lastpass
- 印象笔记




# 背景页（Background Pages）

背景页是持续运行在浏览器后面的，单实例的 JavaScript 脚本。



## 可类比为...

1. ServiceWorker
2. Electron 主进程
3. Client/Server 的 Server


## 添加背景页

在 manifest.json 添加字段：

```
"background": {
  "scripts": ["background.js"]
},
"permissions": [
  "contextMenus"
],
```

## 使用场景

1. 在多个 `content_scripts` 、选项页之间进行调度管理
2. 持续运行自定义任务，比如每 30s 往 12306 发送一条查票请求
3. 监听全局事件（如 webRequest）


## 调试

在 `chrome://extensions` 点击 **检查视图：背景页** 进行调试

## Event Pages

- *Event Pages* 是特殊的 *background Pages* 

* *Background Pages* 持续运行于后台，Chrome 退出才会卸载
* *Event Pages* 在「需要时」才加载，在事件队列为空时卸载
* 通过 `persistent: boolean` 字段控制




# contextMenus

作业：

- 添加一条应用于选中文字上的右键菜单项.
- 点击菜单后，生成选中文字的二维码

提示：

- 在背景页中使用 `chrome.contextMenus.create API` 
- 二维码生成器: https://meowtec.github.io/chrome-extension-dev-guide/qrcode


# chrome.* API

*chrome.\* API* 是一组为 Chrome 扩展提供超能力的 API



# chrome.* API

- `chrome.contextMenus` 控制浏览器右键菜单
- `chrome.webRequest` 监控分析和处理浏览器网络请求
- `chrome.cookies` 管理浏览器 cookies
- `chrome.commands` 添加和监听组合快捷键
- `chrome.tabs` 创建和管理标签
- `chrome.tabs.captureVisibleTab` 对活动标签的可见区域截屏
- ...




# 权限

很多 chrome.* API 都需要对应的权限才能安装和使用：

在 `manifest.json`  中指定 `permissions` 字段。



# browserAction

使用 browserAction 可以在浏览器地址栏右侧放置一个图标，方便用户快速点击。还可以通过设置 popup，在点击后弹出一个小窗口。

常见于：

- SwitchyOmega 代理切换
- 各种二维码生成器
- 截屏扩展

# browserAction

browserAction 包括这些内容：

- `Icon` 图标
- `Tooltip` 鼠标 hover 时的提示文字，类似 HTML 的 title 属性
- `Badge` 一般用来显示消息数
- `popup` 点击 Icon 后弹出网页



# browserAction 入门

在 manifest.json 中添加如下配置：

```
"browser_action": {
  "default_icon": "./icon.png",
  "default_title": "browserAction test",
  "default_popup": "./popup.html"
},
```


# popup debug

弹出 popup 页面后，在页面上右键打开开发者工具



# 作业

修改 popup.html 和相关静态文件，实现如下功能：

- 点击 icon 后弹出 popup，popup 中有一个「截图」按钮
- 点击「截图」，把当前网页截取成图片并在新窗口打开

提示：`chrome.tabs.captureVisibleTab`



# 选项页

如果希望你的扩展可配置，你应该提供一个选项页。



# 选项页

要添加选项页，需要在 manifest.json 中添加如下配置：

```
"options_page": "options.html"
```



# 数据持久化

存储选项或者其他数据需要进行持久化，下次打开浏览器可以使用。

开发扩展时，需要选择合适的方式存储永久性数据。



## localStorage

[localStorage](https://developer.mozilla.org/en/DOM/Storage#localStorage)

- 使用 kv 形式存储数据
- 可以存储大量字符串
- 基于域名，不同域名互相独立

## localStorage in Content script

在 content script （for 百度）中添加下面的内容：

```
console.log(localStorage)
```



## localStorage in Content script

- Content script 访问的是**宿主网页**的 localStorage.
- 背景页、选项页访问的则是**扩展**的 localStorage. 



这就为数据的存储和读取带来了麻烦。



## chrome.storage

[chrome.storage](https://developer.chrome.com/extensions/storage) 是专门用来存储扩展数据的 API。

它在下面几个方面与 localStorage 不同：

- 数据以扩展为单位进行存储，在 Content script 中可以直接读写
- 数据可同步到谷歌服务器
- 可以直接存储 Object，不必 JSON 序列化



# 组件间通信

Chrome 扩展不同组件（如背景页和选项页）或者不同扩展之间有通信的需求，可以通过 `chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage` 来实现。



## 组件间通信实例

为前面开发的二维码扩展添加一个选项页，使用选项页控制菜单项的文字。

要求：

- 选项页中有一个输入框，一个 OK 按钮
- 点击按钮后，修改立即生效
- 由于时间关系，先不考虑数据持久化



# 其他类型

除了 content script，背景页，browserAction 等，还有下面这些可以使用的扩展类型。



## Override Pages

Chrome 的一些页面可以被扩展替换掉，最常见的是新标签页，市面有很多功能丰富的第三方新标签页。下面是可被替换的页面：

- 新标签页
- 历史页
- 书签页



## Override Pages

覆盖默认页，只需要简单的配置：

```
"chrome_url_overrides" : {
  "newtab": "newtab.html"
},
```



## Devtool

在开发者工具上添加新的栏目。

知名的例子如 React devtools.



# 上架准备

在你的扩展做得足够完善时，可以考虑共享出来让其他人使用。

在扩展的发布上，有下面这些事情需要考虑：



# 成为开发者

为了避免 Chrome Web Store 被滥用，你需要注册成为开发者，并支付一笔 $5 的费用，才可以在 Chrome Web Store 发布应用。

没有 Visa 卡的话尽快申请吧。



# 数据格式兼容

传统前端开发中考虑数据前后兼容的情况可能并不多，然而在开发扩展时，必须要考虑到这样的场景：

- 旧版本使用数据结构 A
- 新版本使用数据结构 B
- 用户更新扩展，挂了

所以在实现数据存储时，需要合理设计数据格式和升级策略。



# 国际化

如果你希望你的扩展被全世界范围的人使用，可以使用 `chrome.i18n` API 进行多语言化。



# 用户反馈

在 manifest.json 中提供个人网站地址，或者 Github 仓库地址，便于用户反馈。



# 发布

为照顾国内普通用户，Web Store 发布后请把 crx 文件下载并上传到自己的网站，让用户手动安装。