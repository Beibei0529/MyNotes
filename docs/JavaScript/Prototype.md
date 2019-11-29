# 原型（Prototype）

## 理解原型

要想理解JavaScript中的原型，必须从它设计之初说起。
JavaScrip 在设计之初只想用来实现浏览器和用户的简单交互，比如用户是否填写表单。设计者仿造当时盛行的编程语言 Java 和 C++ 的思想，把JavaScript设计为面向对象的编程语言，但是他没有引入“类”（Class）的概念，但是保留了实例化对象的命令`new`，他想到 C++ 和 Java 使用new命令时，都会调用"类"的构造函数（constructor）。他就做了一个简化的设计，在Javascript语言中，new命令后面跟的不是类，而是构造函数。

现在我们拥有一个 Man 的构造函数，来表示 生成Man对象的模版 ：
```js
function Man (name) {
    this.name = name;
    this.country = 'CN';
}
```
我们对这个构造函数使用 new 命令就会生成一个 Man 对象：
```js
var xm = new Man('XiaoMing')
var xg = new Man('XiaoGang')

console.log(xm.name + xm.country)// XiaoMingCN
console.log(xg.name + xg.country)// XiaoGangCN
```
我们注意到这个例子中 xm 和 xg 两个 Man 对象，他们的 country 都是 CN，但是只是值相同的两个属性，改变其中一个并不会影响另一个。
```js
xm.country = 'China'
console.log('xm.country: ' + xm.country)// xm.country: China
console.log('xg.country: ' + xg.country)// xg.country: CN
```
但是有些属性是这些实例对象共有的，比如像这个例子中的 country，如果只是使用上面这样的继承方式不仅无法做到数据共享，还会造成极大的资源浪费。
考虑到这一点，设计者决定为构造函数设置一个 `prototype` 属性，这个属性包含一个对象（简称"prototype对象"），所有实例对象需要共享的属性和方法，都放在这个对象里面；那些不需要共享的属性和方法，就放在构造函数里面。也就是说，所有的属性和方法分为两种：一种是属于实例对象本身，另一种引用自“prototype对象”，现在我们可以把上面的例子改写一下：
```js
function Man (name) {
    this.name = name;
}
Man.prototype = {country: 'CN'}

var xm = new Man('XiaoMing')
var xg = new Man('XiaoGang')

console.log(xm.name + xm.country)// XiaoMingCN
console.log(xg.name + xg.country)// XiaoGangCN
```
现在我们只要改变“prototype对象”的属性：country，就可以同时改变xm.country 和 xg.country。
```js
Man.prototype.country = 'China'

console.log(xm.name + xm.country)// XiaoMingChina
console.log(xg.name + xg.country)// XiaoGangChina
```
**注意：** 使用prototype继承的属性，改变实例中属性的值并不会影响“prototype对象”的对应属性，因此也不会改变其他实例的对应属性。一般情况下，只会在该实例中新建一个屏蔽属性，该属性名与“prototype对象”中的属性名一致，他会屏蔽掉“prototype对象”中的属性。
```js
xm.country = 'CN'
console.log(xm.name + xm.country)// XiaoMingCN
console.log(Man.prototype.country)// China
console.log(xg.name + xg.country)// XiaoGangChina
```
这个例子中，在 `xm.country = 'CN'` 运行时，就在 xm 对象中生成了一个名为 country
的属性并给它赋值为 'CN'，这个属性会屏蔽掉 Man.prototype.country属性，即生成了一个country副本，所以今后对 xm.country 的任何操作都是对这个副本进行操作。

使用prototype对象（原型对象）实现了数据共享，避免资源浪费。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系被称为**原型链 (prototype chain)**，通过原型链查看对象属性和方法时遵循“就近原则”，找到了就直接调用。

## __ proto __ 属性 

现在我们只能通过**构造函数的prototype**属性访问原型对象，而无法通过实例直接访问原型对象，这里我么可以通过浏览器提供的`__proto__`属性或者是ES5中的`Object.getPrototypeOf(obj)`来访问。
```js
function foo (){}
foo.prototype = {
    bar: '哈哈哈'
}
var f1 = new foo()
console.log(f1.__proto__)// {bar: "哈哈哈",__proto__: Object}
console.log(f1.__proto__ === foo.prototype)// true
console.log(Object.getPrototypeOf(f1) === foo.prototype)// true
```
只有函数才拥有 `prototype` 属性，而所有对象都拥有 `__proto__` 属性。我们知道在JavaScrpt中，函数也是对象,那么函数的 `__proto__` 指向谁呢？
```js
function foo(){}
console.log(foo.__proto__ === Function.prototype)// true
console.log(Function.__proto__ === Function.prototype)// true
console.log(Function.prototype.__proto__ === Object.prototype)// true
console.log(Object.__proto__ === Function.prototype)// true
console.log(Object.prototype.__proto__ === null)// true
```
看上面的例子,foo 函数的__proto__指向 foo 的构造函数的prototype(Function.prototype);
根据这个规则，Function.__proto和 Object.__proto__指向 Function.prototype 因为 Function，Object 本身就是一个函数(新建Function和Object对象时都使用 new 关键字：new Function()和new Object())。
而 Function.prototype是一个普通对象，普通对象的构造函数是Object，因此Function.prototype.__proto__指向 Object.prototype。
最特别的是 `Object.prototype.__proto__` 它指向的是 null。


## constructor 属性

在 prototype 对象中有一个属性：`constructor`，该属性默认指向 prototype 对象所在的构造函数，因此实例对象也可以调用该属性，来访问构造函数：
```js
function Man () {}
var xm = new Man()
console.log(Man.prototype.constructor === Man)// true
console.log(xm.constructor === Man)// true
```
现在我们拥有`constructor`属性，就可以实现不直接调用构造函数，实例化对象：
```js
var xg = new xm.constructor()
console.log(xg.constructor === Man)// true
```

我们在给构造函数的 prototype对象 添加属性或方法时，有两种方式可以添加:

- 通过 Man.prototype.gender 点的形式添加
- 通过 Man.prototype = {} 等号的形式添加

这两种方式看似相同，其实有着截然不同的结果。通过 `.` 点的形式添加是在当前prototype所指的对象上直接添加，而通过 `=` 等号的形式添加则是让prototype指向另一个对象，这两种方式是截然不同的：
```js
function Man () {}
Man.prototype.gender = '男'
console.log(Man.prototype.constructor === Man)// true

Man.prototype = {
    gender: '男'
}
console.log(Man.prototype.constructor === Man)// false
console.log(Man.prototype.constructor === Object)// true
```
我们看到两种方式使得 Man.prototype.constructor 指向不同，`.`的形式默认constructor指向构造函数（Man）；`=`的形式让 Man.prototype 指向一个普通对象`{}`，而普通对象的构造函数是 `Object`。

### 使用 constructor

为了避免上面的问题出现，正确的使用constructor去检测实例与构造函数的关系，我们可以在改变 prototype对象 的同时改变constructor的指向。
```js
function Man () {}
Man.prototype.gender = '男'
console.log(Man.prototype.constructor === Man)// true

Man.prototype = {
    constructor: Man,
    gender: '男'
}
console.log(Man.prototype.constructor === Man)// true
console.log(Man.prototype.constructor === Object)// false
```
还可以使用 constructor.name 查看构造函数,实例也可以使用.
```js
console.log(Man.prototype.constructor.name)// "Man"
var xm = new Man()
console.log(xm.constructor.name)// "Man"
```

### 使用 instanceof 运算符

有好多开发者会用 instance 去检测实例和构造函数的关系。而instanceof 实现的原理就是**判断右操作数的原型对象是否在左操作数的原型链上**。
```js
function Man () {}
Man.prototype.gender = '男'
var xm = new Man()
console.log(xm instanceof Man)// true

Man.prototype = {
    gender: '男'
}
console.log(xm instanceof Man)// false
```
上面例子，xm 是使用Man构造函数实例出来的对象。第一次`console.log(xm instanceof Man)`输出结果为 `true`,因为 Man.prototype指向的对象在 xm 的原型链上。而第二次，在`console.log(xm instanceof Man)`之前改变了 Man.prototype 的指向（Man.prototype前后虽然指向的对象都是包含有一个gender属性的对象，但是他们并不是同一个对象），因此，现在 Man.prototype 所指的对象并不在 xm 的原型链上，这样就会出现一个尴尬的情况：Man实例出来的对象 xm，居然不是Man的实例对象.所以最好不用 instance 去检测实例与构造函数的关系。
