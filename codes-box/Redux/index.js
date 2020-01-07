import createStore from './createStore'
import applyMiddleware from './applyMiddleware'
import {countReducer, infoReducer} from './reducers'
import combineReducers from './combineReducers'
import loggerMiddleware from './loggerMiddleware'
import exceptionMiddleware from './exceptionMiddleware'
import timeMiddleware from './timeMiddleware'

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
