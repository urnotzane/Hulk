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