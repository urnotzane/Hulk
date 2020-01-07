/** promise状态 */
const STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

/** promise私有成员 */
const MyPromiseConstants = {
  status: STATUS.PENDING,
  value: null,
  reason: null,
  onFulfilledCallbacks: [],
  onRejectsCallbacks: [],
  finally: () => {},
  resolve: value => {
    MyPromiseConstants.value = value
    // 状态只能被更改一次
    if (MyPromiseConstants.status === STATUS.PENDING) {
      MyPromiseConstants.status = STATUS.RESOLVED
      MyPromiseConstants.onFulfilledCallbacks.forEach(item => item(value))
      MyPromiseConstants.finally()
      return value
    }
  },
  reject: reason => {
    MyPromiseConstants.reason = reason
    // 状态只能被更改一次
    if (MyPromiseConstants.status === STATUS.PENDING) {
      MyPromiseConstants.status = STATUS.REJECTED
      MyPromiseConstants.onRejectsCallbacks.forEach(item => item(reason))
      MyPromiseConstants.finally()
      return reason
    }
  },
}

class MyPromise {
  constructor(resolver) {
    resolver(MyPromiseConstants.resolve, MyPromiseConstants.reject)
  }
  static resolve = MyPromiseConstants.resolve
  static reject = MyPromiseConstants.reject
  then(onFulfilled, onRejected) {
    typeof onFulfilled ==='function' && MyPromiseConstants.onFulfilledCallbacks.push(onFulfilled)
    typeof onRejected === 'function' && MyPromiseConstants.onRejectsCallbacks.push(onRejected)
    return this
  }
  catch (onRejected) {
    return this.then(null, onRejected)
  };
  finally(onFinally) {
    MyPromiseConstants.finally = onFinally
    return this
  }
}

const mp1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('MyPromise is success!')
    // reject('MyPromise is failed!')
  }, 1000);
})

mp1.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})
.finally(() => {
  console.log('finally:', mp1)
})