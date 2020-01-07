/** 多个中间件合并，返回一个包裹中间件的store */
const applyMiddleware = (...middlewares) => {
  /** 重写createStore的函数 */
  return oldCreateStore => {
    /** 返回新的createStore */
    return (reducer, initState) => {
      const store =  oldCreateStore(reducer, initState)
      let dispatch = store.dispatch
      /** 仅向中间件暴露getState */
      const simpleStore = {getState: store.getState}
      /* 给每个 middleware 传下store，相当于 const logger = loggerMiddleware(store);*/
      /* 相当于const chain = [exception, time, logger]*/
      const chain = middlewares.map(middleware => middleware(simpleStore))

      chain.reverse().forEach(middleware => {
        dispatch = middleware(dispatch)
      })

      /** 重写 */
      store.dispatch = dispatch
      return store
    }
  }
}

export default applyMiddleware