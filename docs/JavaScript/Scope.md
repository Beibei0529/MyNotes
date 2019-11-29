# 作用域 (Scope)

## 理解作用域

要说作用域，大家肯定最先想问什么是作用域？在《你不知道的JavaScript》一书给出了这样的解释：
> 一套设计良好的用来存储变量，并且可以方便地找到这些变量的规则，这套规则就被称为**作用域**。

我们来看一个例子：

```js
  var a = 1;
  function outer () {
    var a = 2
    console.log('outer中的 a = ' + a);
    function inner (a) {
      console.log('inner中的 a = ' + a);
    }
    inner(3);
  }
  outer();
  console.log('全局中的 a = ' + a);
```
浏览器运行以上代码会输出：
```
outer中的 a = 2
inner中的 a = 3
全局中的 a = 1
```
我们注意到 `outer`，`inner` 和全局输出了不同的a，我们来回顾一下上面对**作用域**的定义，可以分两部分理解：
- **第一部分**：存储变量
  
  上面的例子作用域分为三块，我们来看一下他们存储的变量(准确的说是存在的变量)：
  
  - inner作用域：`a`
  - outer作用域：`a` ，`inner`
  - 全局作用域： `a` ，`outer`
  
  **注意：** 这里存储的变量包括传入的参数，作用域内声明的变量和声明的函数名

- **第二部分**：方便找到变量

  在查找变量之前我们先说另一个概念：**作用域链**。顾名思义，作用域链就是作用域嵌套形成的一条**有序**的列表，作用域链的最前端一定是当前作用域。细心地读者应该发现了上文“有序”二字被加粗，那么为什么说它有序？其实就是遍历作用域链的一个规则。

  在JavaScript中遍历作用域链（查找变量）的规则很简单：引擎从当前的执行作用域开始查找变量，如果找不到，就向上一层作用域继续查找，当抵达最外层的全局作用域时，如果还没找到浏览器就会提示这样的错误：
  `Uncaught ReferenceError: 变量名 is not defined`

---

## 作用域的工作模式

由于工作模式的不同我们把作用域分为两种：

- 词法作用域
- 动态作用域

### 词法作用域

  > 定义在词法阶段的作用域
  
  通俗的理解：在你写代码时将变量和块作用域写在哪里来决定，也就是词法作用域是静态的作用域，在你书写代码时就确定了。看一个简单的例子：

  ```js
    var a = 1;
    function foo () {
      console.log("a = " + a);//输出a = 1 还是 a = 2
    }
    function bar () {
      var a = 2;
      foo();
    }
    bar();
  ```
  我们说过，词法作用域是写代码的时候就静态确定下来的。所以当作用域的工作模式是词法作用域时，它会让 `foo()` 函数引用全局作用域中的 `a`，因此会输出 `a = 1`。Javascript中的作用域就是词法作用域（事实上大部分语言都是基于词法作用域的），所以这段代码在浏览器中运行输出 `a = 1`。

### 动态作用域

动态作用域和词法作用域恰恰相反，它并不关心函数和作用域如何声明以及在何处声明，只关心它们**在哪调用**。换句话说，动态作用域的作用域链是基于调用栈的，而不是类似JavaScript中的作用域嵌套。我们再把上面的例子拿下来：
```js
    var a = 1;
    function foo () {
      console.log("a = " + a);//输出a = 1 还是 a = 2
    }
    function bar () {
      var a = 2;
      foo();
    }
    bar();
  ```
  如果JavaScript利用的是动态作用域的工作模式，结果应该输出 `a = 2`。
  
  为什么会这样？因为当 `foo()` 无法找到 `a` 的变量引用时，会顺着调用栈在调用 `foo()` 的地方查找 `a` ，而不是在嵌套的词法作用域链中向上查找。由于 `foo()` 是在 `bar()` 中调用的，引擎会检查 `bar()` 的作用域，并在其中找到值为 2 的变量 `a`。

  需要明确的是：JavaScript中并没有动态作用域，但是JavaScript中 `this` 的机制在某种程度上很像动态作用域。


---

## 块级作用域

上面的例子我们使用的只有全局作用域和函数作用域，下面我们主要介绍一下ES6中引入的一个新概念：块级作用域。看一个简单的例子：
```js
var tmp = new Date();
function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}
f(); // undefined
```
上面代码的想要实现的是：`if`代码块的外部使用外层的`tmp`变量，内部使用内层的`tmp`变量。但是，函数`f`执行后，输出结果为`undefined`，原因在于变量提升，导致内层的`tmp`变量覆盖了外层的`tmp`变量。
再来看一个例子：
```js
var s = 'hello';
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5
```
上面代码中，变量 `i` 只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

由于类似于上面的情况难以被解决，**块级作用域** 油然而生。

#### let产生作用域

ES6 新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。
```JS
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```
上面在一个代码块 `{}` 中分别用 `let` 和 `var` 声明了 `a` ，`b` 两个变量，在代码块的外部可以访问到 `var` 声明的变量并返回了正确值，而不能访问 `let` 声明的变量，这就证明 `let` 声明的变量只在当前代码块有效，而这个代码块 `{}` 就属于一个块级作用域。所以上面那两个例子都可以用块级作用域来解决：把声明变量的 `var` 都改成 `let`。

我们在用一个例子来理解一下块级作用域：
```JS
function test() {
  let x = 1;
  var y = 1; 
  if (true) {
    let x = 2;  // 在块级作用域内声明一个变量 x
    var y = 2;  // 给外层的 y 赋值为 2
    console.log(x);  // 2
    console.log(y);  // 2
  }
  console.log(x);  // 1
  console.log(y);  // 2
}
test();
```
这里我们只讲跟块级作用域有关的知识，想要深入学习 let 用法的可以到：
-  [JS的圣经：MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- [《ES6标准入门》](http://es6.ruanyifeng.com/#docs/let)

### const 产生作用域

除了 `let` 以外，ES6还引入了 `const` ，同样可以用来创建块级作用域变量，但它的值是固定的（常量），之后任何试图改变值的操作都会报错！
```js
if(true){
  var a = 1;
  const b = 2;
   
  a = 3; // 可以修改
  b = 4; // 报错
}
```

### try/catch 产生作用域

其实早在 ES3 中，使用 `try/catch` ，其中的 `catch` 分句 就会创建一个块级作用域，其中声明的变量仅在 `catch` 内部有效。(这里声明的变量指的是`catch()`小括号 () 中的变量，在代码块 {} 中使用 var 声明的变量仍然可以被外部访问)

```js
try{
  undefined(); // 执行一个非法操作符制造一个异常
}catch(err){
  console.log(err); // TypeError: undefined is not a function
}
console.log(err); // ReferenceError: err is not defined
```
上面例子，在 catch 中可以正常访问 err 变量，而在外部无法访问 err 变量，原因就是在catch内部产生了一个块级作用域。

## 参考

- [MDN]()
- [《ES6标准入门》]()
- 《你不知道的JavaScript》