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

export default combineReducers