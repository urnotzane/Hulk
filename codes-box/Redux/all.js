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

/** 合并多个reducer并返回合并后的reducers */
const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers)

  return (state = {}, action) => {
    const nextState = {}

    for(let i = 0; i < reducerKeys.length; i++) {
      /** reducer和state的key值 */
      const reducerKey = reducerKeys[i]
      const reducer = reducers[reducerKey]
      /** 当前reducerKey的当前state */ 
      const currentStateForKey = state[reducerKey]
      /** 当前reducerKey的新state */
      const nextStateForKey = reducer(currentStateForKey, action)

      nextState[reducerKey] = nextStateForKey
    }

    return nextState
  }
}

/** 日志信息中间件 */
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

/** 错误信息中间件 */
const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (err) {
    console.error('错误报告: ', err)
  }
}

/** 时间信息中间件 */
const timeMiddleware = (store) => (next) => (action) => {
  console.log('time', new Date().getTime());
  next(action);
}

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

/** 更改count */
const countReducer = (state, action) => {
  const initState = {
    count: 0,
  }
  !state && (state = initState)

  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      }
    default: 
      return state
  }
}

/** 更改name */
const infoReducer = (state, action) => {
  const initState = {
    name: 'zane',
    age: 18,
  }
  !state && (state = initState)
  
  switch (action.type) {
    case 'SET_NAME':
      state = {
        ...state,
        name: action.name
      }
      break
    case 'SET_AGE':
      state = {
        ...state,
        age: action.age
      }
      break
  }

  return state
}

const reducer = combineReducers({
  counter: countReducer,
  info: infoReducer,
})
/** 返回新的createStore的函数 */
const rewriteCreateStoreFunc = applyMiddleware(loggerMiddleware, exceptionMiddleware, timeMiddleware)
const store = createStore(reducer, rewriteCreateStoreFunc)
// const next = store.dispatch;

// const logger = loggerMiddleware(store);
// const exception = exceptionMiddleware(store);
// const time = timeMiddleware(store)
// store.dispatch = exception(time(logger(next)));

// 测试
store.subscribe(() => {
  const state = store.getState()
  console.log(state)
})
store.dispatch({type: 'SET_NAME', name: 'tong', age: 20})
// store.dispatch({type: 'INCREMENT'})
