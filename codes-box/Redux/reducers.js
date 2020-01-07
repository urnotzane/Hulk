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

export {
  countReducer,
  infoReducer,
}