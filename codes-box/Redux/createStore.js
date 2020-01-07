/** 创建状态管理器 */
const createStore = (reducer, initState, rewriteCreateStoreFunc) => {
  /** 有时候我们创建 store 的时候不传 initState */
  if(typeof initState === 'function') {
    rewriteCreateStoreFunc = initState
    initState = undefined
  }

  /** 如果有重写createStore的函数 */
  if(rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore)
    return newCreateStore(reducer, initState)
  }

  let state = initState
  const listeners = []

  /** 订阅 */
  const subscribe = (listener) => {
    typeof listener === 'function' && listeners.push(listener)
    /** 退订 */
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  /** 发布 */
  const publish = () => {
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  /** 更改state，同步所有state引用 */
  const dispatch = (action) => {
    if(typeof action !== 'object') {
      throw new Error('type of action is wrong')
    }

    if(!action.type) {
      throw new Error('action.type is undefined')
    }

    state = reducer(state, action)
    publish()
  }

  /** 返回当前state */
  const getState = () => state

  /** 初始化state */
  dispatch({type: Symbol()})

  /** 最终接口 */
  return {
    subscribe,
    dispatch,
    getState
  }
}

export default createStore