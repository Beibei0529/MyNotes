# this

在Javascript中，有一个关键字 **this**，表示：**当前执行代码的环境对象**，只存在于全局和函数中。在全局环境中，this指向全局对象；而在函数作用域内，绝大多数情况下this是动态绑定的，this指向他绑定的对象，因此判断this的指向变得非常困难，接下来我们一起来探索一下this的指向。

## 全局作用域中的 this
---
在全局作用域下，this指向全局对象（浏览器中为window对象）。

```js
console.log(this === window) // true
```


## 函数中的 this
---
在严格模式下，如果函数中 this 没有被执行环境（execution context）定义，那它指向 undefined，所以下面我们主要讨论非严格模式下的this。

上面我们说过：绝大多数的this是动态绑定的。所谓动态绑定就是在
函数执行期间绑定，所以要想知道一个函数的this指向，必须先分析是谁调用了该函数。

### 独立函数调用

什么叫独立函数调用，就是没有任何对象调用他，该函数的this就指向全局对象（浏览器中为window对象）。

```js
function fn () {
  console.log(this === window) // true
  function f1 () {
    console.log(this === window) // true
  }
  f1()
}
fn()
```
上面的例子，我们独立调用了函数 fn 和 f1，他们this都指向window。现在我们改变一下fn中this的指向，看看 f1 是否受影响：
```js
function fn () {
  console.log(this === o) // true
  function f1 () {
    console.log(this === window) // true
  }
  f1()
}
var o = {}
fn.call(o)
```
现在我们改变了fn 中 this 的指向，但是f1 并没有受影响。所以 **独立调用函数的this指向全局对象，跟调用环境的 this 指向无关**。

### 对象函数的调用

```js
function sayHello () {
  console.log('你好，我是' + this.name)
}
var obj = {
  name: '李白',
  sayHello: sayHello
}
obj.sayHello() // 你好，我是李白
```
我们使用 `obj.sayHello()` 的形式，让obj调用sayHello函数，所以sayHello中的 this 指向 obj。我们把上面的例子稍微做一下改变：
```js
function sayHello () {
  console.log('你好，我是' + this.name)
}
var obj = {
  name: '李白',
  sayHello: sayHello
}
var name = '杜甫'
var bar = obj.sayHello
obj.sayHello() // 你好，我是李白
bar() // 你好，我是杜甫
```
看完这个例子之后可能会很疑惑，这跟上面的有什么区别？这个例子我们用一个**变量 bar 保存了obj.sayHello的引用**，然后独立调用`bar()`，实际上就是独立调用 `sayHello()`,而我们知道独立调用函数，函数的this指向全局对象，此时 sayHello 的 this 指向 window。

### 函数的 call，apply和bind方法

如果想要强行改变 this 的指向，可以使用 `Function.prototype` 提供的 call，apply和 bind方法。
```js
function add(b, c){
  console.log(this.a + b + c)
}
var a = 1;
add(1, 1) // 3
var obj = {
  a: 2
}
add.call(obj, 1, 1) // 4
add.apply(obj, [1, 1]) // 4
```
我们使用call和apply方法，让add()的this指向了obj对象，所以输出的结果为 4。这里call和apply方法的本质相同，只是传参不同。而bind方法和他俩有一个明显的区别：使用bind方法绑定this指向返回一个新函数，并且这个新函数的this会永久指向绑定的对象，无法改变。
```js
function sayName(){
  console.log(this.name)
}
var name = '杜甫'
var obj = {
  name: '李白'
}
var obj2 = {
  name: '王维'
}
var say = sayName.bind(obj)
say() // 李白
say.call(obj2) // 李白
say.bind(obj2)() // 李白
```
这个例子中我们使用bind方法让say函数的this绑定了obj，使用call和bind都无法改变say函数中this的指向。

### 构造函数中的 this

当一个函数用作构造函数时（使用new关键字），它的this指向new的新对象。

```js
function Person (name) {
  this.name = name
}
var p1 = new Person('李白')
console.log(p1.name) // 李白
```
我们使用new关键字，构造一个对象p1，构造过程中this指向了这个新对象p1，所以`p1.name`就是所传入的name`'李白'`。但是在使用构造函数时需要注意一点：如果构造函数没有返回值，会默认返回构造出来的对象，但是如果函数有返回值，那么就返回这个值。

```js
function Person (name) {
  this.name = name
  return {name:'杜甫'}
}
var p1 = new Person('李白')
console.log(p1.name) // 杜甫
```

### 箭头函数的this

上面我们说过绝大多数情况this是动态绑定的，而箭头函数就是那个例外。
箭头函数的this和所在词法环境的this一致。
```js
var obj = {
  name: '李白',
  sayName: function say(){
    return () => {console.log(this.name)}
  }
}
var name = '杜甫'
obj.sayName()() // 李白
```
看这个例子，当前箭头函数的在say函数内，即所在词法环境是say函数，他的this与 say() 中this一致。当obj调用sayName()时（调用say()），say的指向为 obj，所以箭头函数指向obj，`obj.sayName()()` 输出`李白`。
我们来看换成普通函数会是什么结果：
```js
var obj = {
  name: '李白',
  sayName: function say(){
    return function(){console.log(this.name)}
  }
}
var name = '杜甫'
obj.sayName()() // 杜甫
```
我们可以把`obj.sayName()()`分成两部分看:

- 第一部分：`obj.sayName()`拿到了`function(){console.log(this.name)}`
- 第二部分：`(obj.sayName())()`在全局独立调用得到的函数

因此，`function(){console.log(this.name)}`这个函数的 this 指向全局对象(window),输出 `杜甫`。


## 总结

  到此this指向的判断了解的差不多了，我们来总结一下：
 
  - 静态词法确定this指向
    - 箭头函数

  - 动态绑定确定this指向
    - 构造函数，this指向 new 出来的对象
    - call，apply，bind this指向传入的第一个参数对象
    - obj.method() this指向obj
    - 独立调用函数， this 指向全局对象