# JavaScript设计模式 -- 创建型模式

  所谓创建型模式，是处理对象创建的设计模式，

## 1 - 工厂模式

工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程，考虑到在 ES5 中无法创建类，开发人员 就发明了一种函数，用函数来封装以特定接口创建对象的细节，如下面的例子所示:
```js
function createPerson(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function(){
    alert(this.name);
  };
  return o; 
}
var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");
```
工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题,随后就出现了构造函数模式。

----

## 2 - 构造函数模式

ES5 中的构造函数可用来创建特定类型的对象。像 Object 和 Array 这样的原生构造函数，在运行时会自动出现在执行环境中。此外，也可以创建自定义的构造函数，从而定义自定义对象类型的属性和方法。例如，可以使用构造函数模式将前面的例子重写如下。
```js
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function(){
    alert(this.name);
  }; 
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```
在这个例子中我们可以看到，工厂模式和构造函数的区别：

- 没有显式地创建对象
- 直接将属性和方法赋值给了 this 对象（this就指向了这个新对象）
- 执行构造函数中的代码
- 返回新对象

要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4 个步骤:
- (1) 创建一个新对象;
- (2) 将构造函数的作用域赋给新对象(因此 this 就指向了这个新对象);
- (3) 执行构造函数中的代码(为这个新对象添加属性);
- (4) 返回新对象。

注意：如果不使用 new 操作符新建对象，构造函数中的``` this ```将指向window对象

前面的例子，person1 和 person2 都有一个 ``` constructor ```(构造函数)属性，该属性指向Person，即
```js
console.log(person1.constructor == Person); //true
console.log(person2.constructor == Person); //true
```
对象的``` constructor ```属性最初是用来标识对象类型的。我们在这个例子中创建的所有对象既是 Object 的实例，同时也是 Person 的实例，这一点通过 instanceof 操作符可以得到验证
```js
console.log(person1 instanceof Object);  //true
console.log(person1 instanceof Person);  //true
console.log(person2 instanceof Object);  //true
console.log(person2 instanceof Person);  //true
```
**优点：** 创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型;而这正是构造函数模式 胜过工厂模式的地方。

**缺点：** 使用构造函数的主要问题，就是每个方法都要在每个 实例上重新创建一遍。在前面的例子中，person1 和 person2 都有一个名为 sayName()的方法，但那 两个方法不是同一个 Function 的实例。不同实例上的同名函数是不相等的：
```js
person1.sayName == person2.sayName;  //false
```
然而，创建两个完成同样任务的 Function 实例的确没有必要;况且有 this 对象在，根本不用在 执行代码前就把函数绑定到特定对象上面。因此，大可像下面这样，通过把函数定义转移到构造函数外 部来解决这个问题。
```js
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName;
}
function sayName(){
  alert(this.name);
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
```
这么做虽然解决了重复创建function实例的问题，但是新的问题又来了：如果对象需要定义很多方法，那么就要定义很多个全局函数，于是我们这个自定义的引用类型就丝毫没有封装性可言了。好在， 这些问题可以通过使用原型模式来解决。

---

## 3 - 原型模式

我们创建的每个函数都有一个 prototype(原型)属性，这个属性是一个指针，指向一个对象， 而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如下所示：

```js
function Person(){};

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
  alert(this.name);
};

var person1 = new Person();
person1.sayName();   //"Nicholas"
var person2 = new Person();
person2.sayName(); //"Nicholas"
console.log(person1.sayName == person2.sayName);  //true
```
前面例子中每添加一个属性和方法就要敲一遍 Person.prototype。为减少不必要的输入，也为了从视觉上更好地封装原型的功能，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象，如下面的例子所示：
```js
function Person(){
}
Person.prototype = {
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};
```

在上面的代码中，我们将 Person.prototype 设置为等于一个以对象字面量形式创建的新对象。 最终结果相同，但有一个例外:constructor 属性不再指向 Person 了。而每创建一 个函数，就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 属性。而我们在 这里使用的语法，本质上完全重写了默认的 prototype 对象，因此 constructor 属性也就变成了新对象的 constructor 属性(指向 Object 构造函数)，不再指向 Person 函数。此时，尽管 instanceof 操作符还能返回正确的结果，但通过 constructor 已经无法确定对象的类型了，如下所示：

```js
var friend = new Person();

alert(friend instanceof Object);  //true
alert(friend instanceof Person);  //true
alert(friend.constructor == Person);  //false
alert(friend.constructor == Object);  //true
```
如果 constructor 的值真的很重要，可以像下面这样特意将它设 置回适当的值。
```js
function Person(){}
Person.prototype = {
  constructor : Person,//将该属性的值设置为Person
  name : "Nicholas", 7 age : 29,
  job: "Software Engineer",
  sayName : function () 
    alert(this.name);
  }
};
```
**注意：**
以这种方式重设 constructor 属性会导致它的[[Enumerable]]特性被设置为 true。默认 情况下，原生的 constructor 属性是不可枚举的，因此如果你使用兼容 ES5 的 JavaScript 引擎，可以试一试 Object.defineProperty()。
```js
Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person
});
```
**缺点：**
首先，它省略了为构造函数传递初始化参数这一环节，结果所有实例在 默认情况下都将取得相同的属性值。虽然这会在某种程度上带来一些不方便，但还不是原型的最大问题。 原型模式的最大问题是由其共享的本性所导致的。
原型中所有属性是被很多实例共享的，这种共享对于函数非常合适。对于那些包含基本值的属性倒也说得过去。然而，对于包含引用类型值的属性来说，问题就比较突出了。来看下面的例子：
```js
function Person(){}
Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    friends : ["Shelby", "Court"],
    sayName : function () {
        alert(this.name);
    } 
};
var person1 = new Person();
var person2 = new Person();
person1.friends.push("Van");
console.log(person1.friends);    //"Shelby,Court,Van"
console.log(person2.friends);    //"Shelby,Court,Van"
console.log(person1.friends === person2.friends);  //true
```
在此，Person.prototype对象有一个名为friends的属性，该属性包含一个字符串数组,person1修改了person1.friends引用的数组,同时 person2.friends 也被修改了，这就造成了 person2 的属性被另一个对象修改的困扰。而这个问题正是我们很少看到有人单独使用原型模式的原因所在。

----
## 4 - 组合使用构造函数模式和原型模式

构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本， 但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数;可谓是集两种模式之长。下面的代码重写了前面的例子。

```js
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}
Person.prototype = {
    constructor : Person,
    sayName : function(){
        alert(this.name);````
    }
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
console.log(person1.friends);    //"Shelby,Count,Van"
console.log(person2.friends);    //"Shelby,Count"
console.log(person1.friends === person2.friends);//false
console.log(person1.sayName === person2.sayName);//true
```
在这个例子中，实例属性都是在构造函数中定义的，而由所有实例共享的属性 constructor 和方 法 sayName()则是在原型中定义的。而修改了 person1.friends(向其中添加一个新字符串)，并不 会影响到 person2.friends，因为它们分别引用了不同的数组。

----

## 5 - 动态原型模式

有其他 OO 语言经验的开发人员在看到独立的构造函数和原型时，很可能会感到非常困惑。动态原 型模式正是致力于解决这个问题的一个方案，它把所有信息都封装在了构造函数中，而通过在构造函数中初始化原型(仅在必要的情况下)，又保持了同时使用构造函数和原型的优点。换句话说，可以通过 检查某个应该存在的方法是否有效，来决定是否需要初始化原型。来看一个例子：

```js
function Person(name, age, job){
  //属性
  this.name = name; 
  this.age = age; 
  this.job = job;
  //方法
  if (typeof this.sayName != "function"){//这里判断sayName方法是否存在，如果不存在则在原型上创建该方法，否则表示该方法已经存在，不用在创建
    Person.prototype.sayName = function(){
        alert(this.name);
    }; 
  }
}
var friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
```
----

## 6 - 单例模式

- 传统单例模式: 保证一个类仅有一个实例，并提供一个访问它的全局访问点
- 实现单例的核心思想: 用一个变量标识当前是否已经为某个类创建过对象，如果不是，创建这个对象，如果是，则直接放回之前创建的对象。

### 单例模式的实现

- 适用场景：只需要生成一个唯一对象的时候，比如说页面登录框，只可能有一个登录框，那么你就可以用单例的思想去实现他，当然不用单例的思想实现也行，那带来的结果可能就是你每次要显示登陆框的时候都要重新生成一个登陆框并显示（耗费性能），或者是不小心显示出了两个登录框。
#### es5实现方式

```js
var Singleton = function(name) {
    name();
}
// 提供了一个静态方法，用户可以直接在类上调用
Singleton.getInstance = function(name) {
    return this.instance || (this.instance = new Singleton(name));
}
```
用一个变量 instance 来保存第一次的返回值, 如果它已经被赋值过, 那么在以后的调用中优先返回该变量。

#### es6实现方式

```js
class Singleton {
    constructor(name) {
      name();
    }
    // 构造一个广为人知的接口，供用户对该类进行实例化
    static getInstance(name) {
      return this.instance || (this.instance = new Singleton(name));
    }
}
```

