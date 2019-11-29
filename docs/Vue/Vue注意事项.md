# 使用Vue注意事项

## 使用 v-for 时 key 的意义

> key用来唯一标识一个元素，渲染元素时，判断list改变前后相同key值的元素是否一致，如果一致无需重新渲染，如果不一致重新渲染。

在做项目的时候我们经常会遇到使用v-for来遍历一个数组，像这样：
```html
<li v-for="(item, index) in list" :key="index"></li>
```
这里`item`表示`list`中的每一项，`index`表示索引,假设当前list=[{a:1},{a:2},{a:3}]看起来好像没什么问题。