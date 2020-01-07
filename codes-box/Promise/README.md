# Promise
promise实现

## 描述
### 特征
 - 构造函数。
 - 三种状态：
   - pending：初始状态，既不是成功，也不是失败。
   - fulfilled：操作成功。
   - rejected：操作失败。
 - 两个更改状态的函数resolve和reject，一旦执行其中一个，就不可再次更改，后续异常也不会被捕获，但后续的代码可以执行。
 - resolve更改状态为pending，此时可触发.then回调。
 - reject更改状态为rejected，此时可触发.then和.catch回调。
 - .catch：添加一个拒绝(rejection) 回调到当前 promise, `返回一个新的promise`。当这个回调函数被调用，新 promise 将以它的返回值来resolve，否则如果当前promise 进入fulfilled状态，则以当前promise的完成结果作为新promise的完成结果.
 - .then：添加解决(fulfillment)和拒绝(rejection)回调到当前 promise, `返回一个新的 promise`, 将以回调的返回值来resolve.
 - .finally：添加一个事件处理回调于当前promise对象，并且在原promise对象解析完毕后，`返回一个新的promise对象`。回调会在当前promise运行完毕后被调用，无论当前promise的状态是完成(fulfilled)还是失败(rejected)
 
 ### 包含
 控制台输出一个Promise可以看到其原型包含的方法，这几个方法就是实现一个Promise构造函数的关键：
 ![280f0032572a70524a4c8b9662f973df.png](evernotecid://E737D315-B1F0-415E-A135-9274130DD15D/appyinxiangcom/15763441/ENResource/p31)

 ### 流程图
 来自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
 ![835119a5c72db92a1ae89730a7af1251.png](evernotecid://E737D315-B1F0-415E-A135-9274130DD15D/appyinxiangcom/15763441/ENResource/p29)
 
 ## 简单实现
 
 ```javascript
 /** promise状态 */
const STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

/** promise私有成员 */
const MyPromiseConstans = {
  status: STATUS.PENDING,
  value: null,
  reson: null,
  onFulfilledCallbacks: [],
  onRejectesCallbacks: [],
  finally: () => {},
  resolve: value => {
    MyPromiseConstans.value = value
    // 状态只能被更改一次
    if (MyPromiseConstans.status === STATUS.PENDING) {
      MyPromiseConstans.status = STATUS.RESOLVED
      MyPromiseConstans.onFulfilledCallbacks.forEach(item => item(value))
      MyPromiseConstans.finally()
      return value
    }
  },
  reject: reson => {
    MyPromiseConstans.reson = reson
    // 状态只能被更改一次
    if (MyPromiseConstans.status === STATUS.PENDING) {
      MyPromiseConstans.status = STATUS.REJECTED
      MyPromiseConstans.onRejectesCallbacks.forEach(item => item(reson))
      MyPromiseConstans.finally()
      return reson
    }
  },
}

class MyPromise {
  constructor(resolver) {
    resolver(MyPromiseConstans.resolve, MyPromiseConstans.reject)
  }
  static resolve = MyPromiseConstans.resolve
  static reject = MyPromiseConstans.reject
  then(onFulfilled, onRejected) {
    typeof onFulfilled ==='function' && MyPromiseConstans.onFulfilledCallbacks.push(onFulfilled)
    typeof onRejected === 'function' && MyPromiseConstans.onRejectesCallbacks.push(onRejected)
    return this
  }
  catch (onRejected) {
    return this.then(null, onRejected)
  };
  finally(onFinally) {
    MyPromiseConstans.finally = onFinally
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
```
