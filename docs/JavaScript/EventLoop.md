# 浏览器中的事件循环(Event Loop)

## 事件循环的由来

要说事件循环，我们需要探寻两个问题：

- 什么是事件循环？
- 为什么会有事件循环？

我们都知道JavaScript是单线程语言，所谓单线程就是同一时间只能执行一个任务，并且只能顺序执行，这就会导致一些比较严重的问题。
像执行一个网络请求，从后台获取数据需要一定的时间，假设这个请求需要200ms，就会造成页面在200ms内阻塞，这是很不好的用户体验。 
为了解决这个问题，JavaScript引入了异步任务，而区别于异步任务的叫做同步任务。

> **同步任务：**立即执行的任务
> **异步任务：**不会立即执行的任务

那么在浏览器中同步任务，异步任务还有页面的渲染是按照什么顺序执行的呢？其实这些任务的执行顺序都已经被Javascript规定好了，而这个规定就叫**事件循环(Event Loop)**。

## 任务队列

我们知道异步任务不会立即执行，需要把它存放起来然后等待执行，而存异步任务的地方就是任务队列。

异步任务还分为宏任务（macrotask）和微任务（microtask）,分别存放在宏任务队列和微任务队列中,后面我们会说明宏任务和微任务的不同。

- 宏任务：script(全局任务), setTimeout, setInterval, setImmediate, I/O操作
- 微任务：process.nextTick, Promise, MutationObserver

## 模拟事件循环

代码执行过程中遇到宏任务放到宏任务队列中，遇到微任务放到微任务队列中。上面我们说过事件循环是同步任务，异步任务执行顺序的规定，而这个规则就是：

1. 从宏任务队列里拿出一个宏任务执行（第一个宏任务永远是script）
2. 执行微任务队列里所有的微任务
3. 页面渲染

根据这个规则我们来看一个例子：

```js
setTimeout(function() {
    console.log(1);
}, 0);
new Promise(function (resolve, reject) {
    resolve(2);
    console.log(0)
}).then(console.log);
console.log(3);
```
按照规则，我们来模拟一下事件循环：

1. 执行第一个宏任务 script：
    - `console.log(0)`
    - `console.log(3)`
2. 执行微任务队列：
    -  `console.log(2)`
3. 页面渲染
4. 执行第二个宏任务 setTimeout():
    - `console.log(1)`
5. 页面渲染

## 宏任务和微任务的区别

由于事件循环的规则，宏任务和微任务有一个明显的区别：无论多少宏任务都无法造成页面阻塞，而微任务很多或者耗时长容易造成页面阻塞。

一次事件循环只执行一个宏任务,所以不会造成页面阻塞：

```js
function loop () {
    setTimeout(loop, 0)
}
```

而在一次事件循环中需要把微任务队列里的所有微任务执行完，当微任务耗时较长或者微任务较多时容易造成页面阻塞：

```js
function loop () {
    Promise.resolve().then(loop)
}
```

> 如果还没有理解EventLoop，这里提供一个视频来学习：[https://www.youtube.com/watch?v=cCOL7MC4Pl0](https://www.youtube.com/watch?v=cCOL7MC4Pl0)

