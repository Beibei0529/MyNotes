# 提升(Hoisting)

## 变量提升

在平常的学习和工作中，我们经常会碰到这种状况：先调用后声明，像下面这样：
```js
console.log(a);// undefined
var a = 1;
```
在 a 变量声明之调用了它，并没有报错，而是输出了`undefined`，这是因为JavaScript存在变量提升，他会把变量的**声明部分提升到函数作用域的顶部，而初始化部分保持原位等待执行**。所以上面的例子可以写成这样：
```js
var a;
console.log(a);// undefined
a = 1;
```
**注意：**使用ES6里，let 声明的变量和 const 声明的常量不存在提升。

## 函数提升

JavaScript中不光存在变量提升，还存在函数提升：
```js
sayHello("小明");// Hello 小明!
function sayHello (man) {
    console.log("Hello " + man + "!");
}
```
我们看到在`sayHello()`被声明之前调用依然有效，正是因为函数声明的提升！
值得注意的是：在JavaScript中只有函数声明会被提升，函数表达式不会被提升：
```js
sayHello("小明");// TypeError: sayHello is not a function
var sayHello = function fn (man) {
    console.log("Hello " + man + "!");
}
```
浏览器中执行这段代码，报错：`TypeError: sayHello is not a function`，所以这个`sayHello`函数没有被提升。
我们可以试着把
`var sayHello = function fn (man) {console.log("Hello "+man+"!");}`看作是一个变量：等号前面是对`sayHello`变量的声明，等号后面是对变量`sayHello`的初始化。如果是这样的话，那么变量`sayHello`的声明部分会被提升，初始化部分不会被提升，即在声明之前访问`sayHello`变量不会报错，只会返回一个默认的`undefined`值：

```js
console.log(sayHello);// undefined
var sayHello = function fn (man) {
    console.log("Hello " + man + "!");
}
```
事实证明，我们的猜想是对的：**函数表达式和变量一样只会提升声明部分，而初始化部分会留在原地等待执行！**

## 函数优先

还有一点我们需要知道：当函数声明和变量声明同时出现时，函数声明提升的优先级较高（如果想要知道原因可以去查看js引擎是如何工作的）。看下面这个例子：
```js
foo(); // 1
var foo = function() { 
    console.log( 2 );
};
function foo() { 
    console.log( 1 );
}
```
其实这个例子会被JavaScript理解为这样：
```js
function foo() { 
    console.log( 1 );
}
foo(); // 1
foo = function() { 
    console.log( 2 );
};
```
由于 foo 在上面已经被声明过了（函数声明），所以后面的`var foo`被忽略，因此结果输出为 1 。

## 总结

从概念的字面意义上说，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，但这么说并不准确。实际上变量和函数声明在代码里的位置是不会动的，而是在编译阶段被放入内存中。由于JavaScript存在这样的提升，所以在使用变量之前声明变量并给定初始值是更好的选择，