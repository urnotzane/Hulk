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

    handle()
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