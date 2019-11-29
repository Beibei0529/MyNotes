# Promise

## Promise比起回调函数的优势

Promise是一种处理异步的一种手段。在Promise出现之前，开发人员使用的是比较传统的回调函数来处理异步操作。我们先来看一下回调函数处理异步：
```js
//假设doSomething，doSomethingElse和doThirdThing都是异步函数
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```
使用Promise可以改写成这样：
```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {console.log('Got the final result: ' + finalResult);})
.catch(failCallback)
```
可以看到，Promise使用链式写法处理多个异步比传统的回调函数更合理，异常处理更加方便，只需在Promise末尾增加一个catch方法捕获异常即可。

## promise基本用法

- Promise首先是一个对象，使用关键字new来创建 
```js
new Promise()
```

- 其次Promise构造函数接受一个函数作为参数，该函数有两个参数
```js
let promise = new Promise((resolve, reject) => {})
```
resolve和reject这两个参数是两个函数。Promise有三种状态：pending，fulfilled，rejected，一般resolve会被认为是fulfilled。

    - **resolve函数: pending => fulfilled**
    - **reject函数:  pending => rejected**
    
并且状态变化只有这两种情况，并且一旦状态改变，无法在变。
一般情况，Promise内包裹一个异步操作：
```js
function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => { resolve(image)}
    image.onerror = () => { reject(new Error('Could not load image at ' + url))}
    image.src = url;
  })
}
```
### then方法

Promise实例拥有一个then方法，then方法接收两个参数，第一个参数为resolved状态的回调函数；第二个参数为rejected状态的回调函数，即resolve()触发then的第一个回调，reject()触发then的第二个回调。借用上一个例子：
```js
loadImageAsync('animal.jpg').then(
    image => {
        document.body.appendChild(image)
    },
    err => {
        console.log(err)
    }    
)
```
上面例子，当`animal.jpg`加载成功把它添加到body下，否则输出error。
Promise.then()会返回一个新的Promise，所以可以链式使用then方法，代替嵌套的回调函数。

### catch方法

Promise还有一个catch方法，它相当于then(null, reject => {})，用于捕捉整个Promise中的错误，它相对于reject的回调要更好，可以捕捉resolve回调中的错误。
所以上面的例子可以改写成这样：
```js
loadImageAsync('animal.jpg')
.then(image => { document.body.appendChild(image)})
.catch(err => { console.log('发生错误：' + err)})
```

### Promise.resolve() 和 Promise.reject()

为了方便使用，JS提供了`Promise.resolve()` 和 `Promise.reject()`这两个方法。

```js
Promise.resolve()
//等价于
new Promise(resolve => resolve())

Promise.reject()
//等价于
new Promise((resolce, reject) => reject())
```

### Promise.all() 和 Promise.race()

`Promise.all()` 和 `Promise.race()`都是将多个Promise实例(接收一个可迭代的参数)，包裹成一个新的Promise实例，但是它们的表现是不同的。

#### Promise.all()

Promise.all()状态的改变有两种情况：

- 所有Promise实例状态都变成resolved，Promise.all()状态由pending变为resolved
- 其中一个Promise实例状态变为rejected，Promise.all()状态由pending变为rejected

resolved时返回一个数组：
```js
let p1 = Promise.resolve(3);
let p2 = 1337;
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
}); 

Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); // [3, 1337, "foo"] 
});
```

rejected时返回当前reject的值：
```js
Promise.all([1, 2, Promise.reject(3), 4])
.then(res => { consoel.log(res)})
.catch(err => { console.log('发生错误：' + err)})
```
#### Promise.race()

Promise.race()与Promise.all()表现不同，它用来捕捉率先发声状态改变的Promise实例。
```js
Promise.race([
  new Promise(
    resolve => {
      setTimeout(() => {resolve(2)}, 0)
    }
  ),
  1
]).then(res => {console.log(res)})// 1

Promise.race([
  new Promise(
    resolve => {
      setTimeout(() => {resolve(2)}, 100)
    }
  ),
  new Promise(
    resolve => {
      setTimeout(() => {resolve(1)}, 0)
    }
  )
]).then(res => {console.log(res)})// 1
```

## 参考

Promise知识还有很多，感兴趣的可以参考一下资料：

- [MDN  Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [ECMAScript 6 入门：Promise](http://es6.ruanyifeng.com/#docs/promise)
