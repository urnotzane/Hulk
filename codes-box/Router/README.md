# Router
实现前端路由

## 来源
> SPA是Single Page Web Application的简称，译为单页面应用。

SPA就是一个web项目只有一个HTML页面，一旦完成加载，页面不会因为用户的操作而进行页面的跳转，取而代之的是一种js动态变换HTML内容，来模拟页面的视图转换。

然而，这样的交互方式会导致两个问题：
1. SPA无法记住用户的页面操作，如刷新、前进和后退。
2. SPA中虽然由于业务不同会有多种页面的展示，但是只有一个url，对页面SEO不友好。

## 概念
于是，为了解决这样的问题，为SPA的每个视图配置不同的url，在用户刷新、前进、后退和SEO时，均由这个url来实现，路由横空出世。

为了实现路由，必须做到以下两点：
1. 改变url而不让浏览器向服务器发送请求。
2. 可以监听到url的变化。

## hash路由
> 由于hash值得变化不会导致浏览器向服务器发送请求，而且hash值得变化会触发`hashchenge`事件，因此我们可以通过这些来进行对浏览器页面的前进、后退和刷新等控制。`#`号是hash路由的标志，我们主要通过监听url中的hash值得变化来进行路由跳转。

### 思路
- 保存路由地址所对应的回调。
- 特殊的路由回调保存如：首页的`/`、`404`。
- 监听页面加载`onload`事件。
- 监听页面hash值变化事件。
- 执行路由回调函数，如果当前不存在hash值则执行首页回调，如果当前hash值未保存则执行404回调。

### 实现：

```javascript
class HashRouter {
      constructor() {
        this.routers = {}
        this.load = this.load.bind(this)
        window.addEventListener('load', this.load, false)
        window.addEventListener('hashchange', this.load, false)
      }
      commonEmptyFunction() {}
      /** 注册路由，将hash对应的回调存入routers */
      register(hash, callback = this.commonEmptyFunction) {
        this.routers[hash] = callback
      }
      /** 注册首页 */
      registerIndex(callback = this.commonEmptyFunction) {
        this.routers['/'] = callback
      }
      /** 页面404 */
      registerNotFound(callback = this.commonEmptyFunction) {
        this.routers['404'] = callback
      }
      /** 加载视图 */
      load() {
        // 如果hash未注册，页面404
        let handle = this.routers['404']
        const currentUrl = location.hash.slice(1)
        
        if (!currentUrl) {
          handle = this.routers['/']
        } else {
          // 如果hash已注册
          if (this.routers.hasOwnProperty(currentUrl)) {
            handle = this.routers[currentUrl]
          }
        }

        handle.apply(this)
      }
    }

    const router = new HashRouter()
    const main = document.getElementById('main')

    router.registerIndex(() => main.innerText = '这是首页')
    router.registerNotFound(() => main.innerText = '页面未找到')
    router.register('/page1', () => main.innerText = '这是page1')
    router.register('/page2', () => main.innerText = '这是page2')
    router.register('/page3', () => main.innerText = '这是page3')

    router.load()
```

## history模式
### 定义
在H5规范之前就已经有了history模式，能够进行多页面的跳转：
```javascript
history.go(-1)
history.go(2)
history.forward()
history.back()
```

而后H5新增了以下规范：
- history.pushState(state, title, url)。
  - `state`：一个与添加的记录相关联的状态对象，主要用于popstate事件。该事件触发时，该对象会传入回调函数。也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。如果不需要这个对象，此处可以填null
  - `title`：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
  - `url`：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。
  
- history.replaceState(state, title, url)。
  用来修改 History 对象的当前记录，其他都与pushState()方法一模一样。

- history.state。
  返回当前状态对象。
  
- popstate事件
  每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。
  **注意**：仅仅调用pushState()方法或replaceState()方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用History.back()、History.forward()、History.go()方法时才会触发。另外，该事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。
  
### 思路
- 保存路由地址所对应的回调。
- 特殊的路由回调保存如：首页的`/`、`404`。
- 监听`popstate`事件，如果用户操作页面的前进和后退则执行相对应的回调。
- 监听a标签点击事件，阻止默认事件，将a标签的href属性push到路由状态里，执行相对应的回调。
- 第一次加载页面时，路由state为null，为null则执行首页回调，为404则执行404回调。
  
### 实现

```javascript
class HistoryRouter {
  constructor() {
    this.routers = {}
    this.handleLink()
    this.handlePopstate()
  }
  /** 公共空函数 */
  commonEmptyFunction() {}
  /** 注册路由 */
  register(path, callback = this.commonEmptyFunction) {
    this.routers[path] = callback
  }
  /** 注册首页 */
  registerIndex(callback = this.commonEmptyFunction) {
    this.routers['/'] = callback
  }
  /** 注册404 */
  registerNotFound(callback = this.commonEmptyFunction) {
    this.routers['404'] = callback
  }
  /** 监听popstate事件 */
  handlePopstate() {
    window.addEventListener('popstate', e => {
      this.load()
    }, false)
  }
  /** 监听a链接 */
  handleLink() {
    window.addEventListener('click', e => {
      const dom = e.target
      const href = dom.getAttribute('href')
      if(dom.tagName.toUpperCase() === 'A' && href) {
        e.preventDefault()
        this.go(href)
      }
    }, false)
  }
  /** 前进 */
  go(path) {
    window.history.pushState({path}, null, path)
    this.load()
  }
  /** 加载视图 */
  load() {
    // 第一次加载页面state通常为null
    const state = window.history.state
    let handle = this.routers['404']
    
    if(!state) {
      handle = this.registerIndex
    } else {
      if(this.routers[state.path]){
        handle = this.routers[state.path]
      }
    }

    handle.apply(this)
  }
}

const router = new HistoryRouter()
const text = document.getElementById('text')

router.registerIndex(() => text.innerHTML = '首页')
router.registerNotFound(() => text.innerHTML = '404')
router.register('/page1', () => text.innerHTML = '页面1')
router.register('/page2', () => text.innerHTML = '页面2')
router.register('/page3', () => text.innerHTML = '页面3')

router.load()
```

### 注意
history模式的路由需要服务器配置支持，否则在浏览器刷新页面时，由于浏览器的当前地址是由js控制的，服务器没有相应的页面，导致无法获取相应页面的资源而报错`Cant GET`。

## 参考
- [面试官: 你了解前端路由吗?](https://juejin.im/post/5d2d19ccf265da1b7f29b05f#heading-5)
- [「面试必考」彻底弄懂前端路由](https://juejin.im/post/5ac61da66fb9a028c71eae1b)